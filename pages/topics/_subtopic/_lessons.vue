<template>
  <PageContainer :title="title" :primary-page="false">
    <div>
      <div
        v-if="subtopic && subtopic.lessons.length > 0"
        class="border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem
          v-for="lesson in subtopic.lessons"
          :key="lesson.id"
          :title="lesson.title"
          :link="lesson.id"
        />
      </div>
      <div v-else class="px-4">Keine Inhalte</div>
    </div>
  </PageContainer>
</template>

<script>
import subtopic from '~/graphql/queries/subtopic'

import ListItem from '~/components/common/ListItem'

export default {
  components: { ListItem },
  computed: {
    title() {
      return this.subtopic ? this.subtopic.title : '...'
    }
  },
  apollo: {
    subtopic: {
      query: subtopic,
      prefetch: ({ route }) => ({ id: route.params.lessons }),
      variables() {
        return { id: this.$route.params.lessons }
      }
    }
  }
}
</script>

<style></style>
