<template>
  <PageContainer :title="title">
    <div v-if="allTopics" class="grid grid-cols-2 gap-4 px-4">
      <TopicItem
        v-for="topic in allTopics"
        :key="topic.id"
        :title="topic.title"
        :link="topic.id"
      />
    </div>
    <div v-else>Keine Inhalte</div>
  </PageContainer>
</template>

<script>
import allTopics from '~/graphql/queries/allTopics'
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
  apollo: {
    allTopics: {
      query: allTopics,
      prefetch: true
    }
  }
}
</script>
