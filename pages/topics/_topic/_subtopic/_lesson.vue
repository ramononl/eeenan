<template>
  <StoriesContainer
    v-if="stories"
    :close-link="closeLink"
    :stories-data="storiesData"
    @next-story="nextStory"
    @prev-story="prevStory"
    @finish-lesson="finishLesson"
  >
    <div>
      <p>{{ currentStoryData }}</p>
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
import StoriesContainer from '~/components/layout/StoriesContainer'

export default {
  layout: 'fullscreen',
  components: {
    StoriesContainer
  },
  data() {
    return {
      currentStory: 1
    }
  },
  computed: {
    closeLink() {
      return `/topics/${this.$route.params.topic}/${this.$route.params.subtopic}`
    },
    subtopicTitle() {
      if (Object.keys(this.$store.state.subtopics).length !== 0) {
        return this.$store.state.subtopics[this.$route.params.topic][
          this.$route.params.subtopic
        ].title
      } else {
        return '...'
      }
    },
    lessonTitle() {
      if (Object.keys(this.$store.state.lessons).length !== 0) {
        return this.$store.state.lessons[this.$route.params.topic][
          this.$route.params.subtopic
        ][this.$route.params.lesson].title
      } else {
        return '...'
      }
    },
    stories() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.stories[this.$route.params.topic][
            this.$route.params.subtopic
          ],
          this.$route.params.lesson
        )
      ) {
        const stories = this.$store.state.stories[this.$route.params.topic][
          this.$route.params.subtopic
        ][this.$route.params.lesson]
        const storiesArray = Object.keys(stories).map((key) => {
          return { id: key, ...stories[key] }
        })
        storiesArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return storiesArray
      } else {
        return false
      }
    },
    currentStoryData() {
      if (this.stories) {
        return this.stories[this.currentStory - 1]
      } else {
        return false
      }
    },
    storiesData() {
      return {
        subtopic: this.subtopicTitle,
        lesson: this.lessonTitle,
        numberOfStories: this.stories.length,
        currentStory: this.currentStory,
        currentStoryId: this.currentStoryData.id
      }
    }
  },
  methods: {
    dateInSeconds() {
      return Math.floor(Date.now() / 1000)
    },
    nextStory() {
      this.$store.dispatch('user/addFinishedStory', {
        key: this.currentStoryData.id,
        date: this.dateInSeconds()
      })
      this.currentStory++
    },
    prevStory() {
      this.currentStory--
    },
    finishLesson() {
      this.$store.dispatch('user/addFinishedStory', {
        key: this.currentStoryData.id,
        date: this.dateInSeconds()
      })
    }
  }
}
</script>

<style></style>
