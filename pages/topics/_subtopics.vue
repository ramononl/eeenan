<template>
  <PageContainer :title="title" :primary-page="false">
    <div>
      <div
        v-if="topic && topic.subtopics.length > 0"
        class="border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem
          v-for="subtopic in topic.subtopics"
          :key="subtopic.id"
          :title="subtopic.title"
          :link="subtopic.id"
        />
      </div>
      <div v-else class="px-4">Keine Inhalte</div>
    </div>
  </PageContainer>
</template>

<script>
import topic from '~/graphql/queries/topic'

import ListItem from '~/components/common/ListItem'

export default {
  components: { ListItem },
  computed: {
    title() {
      return this.topic ? this.topic.title : '...'
    }
  },
  apollo: {
    topic: {
      query: topic,
      prefetch: ({ route }) => ({ id: route.params.subtopics }),
      variables() {
        return { id: this.$route.params.subtopics }
      }
    }
  }
}
</script>

<style></style>
