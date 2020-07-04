<template>
  <PageContainer title="Stories" :primary-page="false">
    <div>
      <div v-if="lesson && lesson.stories.length > 0">
        <p v-for="story in lesson.stories" :key="story.id" :title="story.title">
          {{ story.description }}
        </p>
      </div>

      <div v-else class="px-4">Keine Inhalte</div>
    </div>
  </PageContainer>
</template>

<script>
import lesson from '~/graphql/queries/lesson'

export default {
  apollo: {
    lesson: {
      query: lesson,
      prefetch: ({ route }) => ({ id: route.params.stories }),
      variables() {
        return { id: this.$route.params.stories }
      }
    }
  }
}
</script>

<style></style>
