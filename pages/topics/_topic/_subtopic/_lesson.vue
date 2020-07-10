<template>
  <StoriesContainer
    :close-link="closeLink"
    :stories-data="storiesData"
    @next-story="nextStory"
    @prev-story="prevStory"
    @finish-lesson="finishLesson"
  >
    <div v-if="stories">
      <p>{{ currentStoryData.content }}</p>
    </div>
  </StoriesContainer>
  <!-- <div>
    <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
      <div class="flex items-center justify-center">
        <span>{{ topicTitle }}</span>
        <AppIcon :size="8" icon="ChevronRight" />
        <span>{{ subtopicTitle }}</span>
      </div>
      {{ stories }}
    </div>
  </div> -->
</template>

<script>
import fetchDataDispatchers from '~/mixins/fetchDataDispatchers'
import StoriesContainer from '~/components/layout/StoriesContainer'

export default {
  layout: 'fullscreen',
  components: {
    StoriesContainer
  },
  mixins: [fetchDataDispatchers],
  data() {
    return {
      currentStory: 1
    }
  },
  computed: {
    closeLink() {
      return `/topics/${this.$route.params.topic}/${this.$route.params.subtopic}`
    },
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
      if (this.$store.state.stories.length > 0) {
        return this.$store.state.stories
      } else {
        return false
      }
    },
    currentStoryData() {
      if (this.$store.state.stories.length > 0) {
        return this.$store.state.stories[this.currentStory - 1]
      } else {
        return false
      }
    },
    storiesData() {
      return {
        subtopic: this.topicTitle,
        lesson: this.subtopicTitle,
        numberOfStories: Object.keys(this.stories).length,
        currentStory: this.currentStory
      }
    }
  },
  mounted() {
    this.fetchStories()
  },
  beforeDestroy() {
    this.$store.commit('removeStories')
  },
  methods: {
    nextStory() {
      this.$store.dispatch(
        'progress/addFinishedStory',
        this.currentStoryData.id
      )
      this.currentStory++
    },
    prevStory() {
      this.currentStory--
    },
    finishLesson() {
      this.$store.dispatch(
        'progress/addFinishedStory',
        this.currentStoryData.id
      )
    }
  },
  middleware: 'auth'
}
</script>

<style></style>
