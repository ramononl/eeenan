<template>
  <PageContainer :title="title">
    <!-- <div v-if="allTopics" class="grid grid-cols-2 gap-4 px-4">
      <TopicItem
        v-for="topic in allTopics"
        :key="topic.id"
        :title="topic.title"
        :link="topic.slug"
      />
    </div> -->
    <div class="grid grid-cols-2 gap-4 px-4">
      <TopicItem
        v-for="topic in topics"
        :key="topic.id"
        :title="topic.title"
        :link="topic.id"
      />
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
      return this.$store.state.topics
    }
  },
  created() {
    this.$store.dispatch('fetchTopics')
  }
}
</script>
