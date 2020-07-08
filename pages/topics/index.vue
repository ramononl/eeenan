<template>
  <PageContainer :title="title">
    <div v-if="topics" class="grid grid-cols-2 gap-4 px-4">
      <TopicItem
        v-for="(topic, name) in topics"
        :key="name"
        :title="topic.title"
        :link="name"
      />
    </div>
    <div v-else>
      Loading
    </div>
  </PageContainer>
</template>

<script>
import fetchDataDispatchers from '~/mixins/fetchDataDispatchers'
import TopicItem from '~/components/common/TopicItem'

export default {
  components: {
    TopicItem
  },
  mixins: [fetchDataDispatchers],
  data() {
    return {
      title: 'Themen'
    }
  },
  computed: {
    topics() {
      if (Object.keys(this.$store.state.topics).length !== 0) {
        return this.$store.state.topics
      } else {
        return false
      }
    }
  },
  created() {
    this.fetchTopics()
  }
}
</script>
