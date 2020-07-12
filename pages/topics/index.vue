<template>
  <PageContainer :title="title">
    <div v-if="topics" class="grid grid-cols-2 gap-4 px-4">
      <TopicItem
        v-for="topic in topics"
        :key="topic.id"
        :title="topic.title"
        :link="topic.id"
      />
    </div>
    <div v-else>
      Loading
    </div>
  </PageContainer>
</template>

<script>
import TopicItem from '~/components/common/TopicItem'

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
  }
}
</script>
