<template>
  <div>
    <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
      <div class="flex items-center justify-center">
        <span>{{ topicTitle }}</span>
        <AppIcon :size="8" icon="ChevronRight" />
        <span>{{ subtopicTitle }}</span>
      </div>
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
import fetchDataDispatchers from '~/mixins/fetchDataDispatchers'

export default {
  layout: 'fullscreen',
  mixins: [fetchDataDispatchers],
  // computed: {
  //   title() {
  //     return this.subtopic ? this.subtopic.title : '...'
  //   }
  // },
  computed: {
    topicTitle() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.topics,
          this.$route.params.topic
        )
      ) {
        return this.$store.state.topics[this.$route.params.topic].title
      } else {
        return '...'
      }
    },
    subtopicTitle() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.subtopics,
          this.$route.params.topic
        )
      ) {
        if (
          Object.prototype.hasOwnProperty.call(
            this.$store.state.subtopics[this.$route.params.topic],
            this.$route.params.subtopic
          )
        ) {
          return this.$store.state.subtopics[this.$route.params.topic][
            this.$route.params.subtopic
          ].title
        } else {
          return '...'
        }
      } else {
        return '...'
      }
    },
    stories() {
      return this.$store.state.stories
    }
  },
  mounted() {
    this.fetchStories()
  },
  beforeDestroy() {
    this.$store.commit('removeStories')
  }
}
</script>

<style></style>
