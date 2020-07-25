<template>
  <PageContainer :title="title" :padding-x="true">
    <div v-if="topics" class="space-y-4">
      <TopicItem
        v-for="topic in topics"
        :key="topic.id"
        :title="topic.title"
        :link="topic.id"
        :img="topic.id"
      />
    </div>
    <div v-else>
      Loading
    </div>
  </PageContainer>
</template>

<script>
import TopicItem from '~/components/ui/topics/TopicItem'

export default {
  components: {
    TopicItem
  },
  data() {
    return {
      title: 'Themen'
    }
  },
  computed: {
    topics() {
      if (Object.keys(this.$store.state.topics).length !== 0) {
        const topics = this.$store.state.topics
        const topicsArray = Object.keys(topics).map((key) => {
          return { id: key, ...topics[key] }
        })
        topicsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return topicsArray
      } else {
        return false
      }
    }
  },
  transition(to, from) {
    if (to) {
      if (to.name === 'topics-topic') {
        return {
          name: 'slide-left',
          mode: ''
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  @apply transform transition-all duration-300 ease-out;
}

.slide-left-enter,
.slide-right-leave-to {
  @apply translate-x-full;
}

.slide-left-leave-to,
.slide-right-enter {
  @apply opacity-50;
}
</style>
