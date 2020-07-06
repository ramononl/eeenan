<template>
  <div>
    <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
      {{ stories }}
      <!-- <ListItem
          v-for="lesson in lessons"
          :key="lesson.id"
          :title="lesson.title"
          :link="lesson.id"
        /> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullscreen',
  // computed: {
  //   title() {
  //     return this.subtopic ? this.subtopic.title : '...'
  //   }
  // },
  computed: {
    stories() {
      return this.$store.state.stories
    }
  },
  created() {
    this.$store.dispatch('fetchStories', {
      topic: this.$route.params.topic,
      subtopic: this.$route.params.subtopic,
      lesson: this.$route.params.lesson
    })
  }
}
</script>

<style></style>
