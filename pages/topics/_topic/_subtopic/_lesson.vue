<template>
  <StoriesContainer
    v-if="stories"
    :stories-data="storiesData"
    @next-story="nextStory"
    @prev-story="prevStory"
    @finish-lesson="finishLesson"
  >
    <div>
      <p>{{ currentStoryData }}</p>
    </div>
  </StoriesContainer>
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
    lessonTitle() {
      const lessonsStore = this.$store.state.lessons
      const lesson = this.$getNested(
        lessonsStore,
        this.$route.params.topic,
        this.$route.params.subtopic,
        this.$route.params.lesson
      )
      if (lesson) {
        return lesson.title
      } else {
        return '...'
      }
    },
    stories() {
      const storiesStore = this.$store.state.stories
      const stories = this.$getNested(
        storiesStore,
        this.$route.params.topic,
        this.$route.params.subtopic,
        this.$route.params.lesson
      )

      if (stories) {
        const storiesArray = Object.keys(stories).map((key) => {
          return { id: key, ...stories[key] }
        })
        storiesArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return storiesArray
      } else {
        return false
      }
    },
    storiesData() {
      return {
        lesson: this.lessonTitle,
        numberOfStories: this.stories.length,
        currentStory: this.currentStory,
        currentStoryId: this.currentStoryData.id
      }
    },
    currentStoryData() {
      if (this.stories) {
        return this.stories[this.currentStory - 1]
      } else {
        return false
      }
    }
  },
  watch: {
    stories() {
      this.checkQuery()
    }
  },
  mounted() {
    this.checkQuery()
  },
  methods: {
    checkQuery() {
      if (
        this.stories.length > 0 &&
        Object.hasOwnProperty.call(this.$route.query, 'start')
      ) {
        const query = this.$route.query.start
        const index = this.stories.findIndex((element) => element.id === query)
        this.currentStory = index + 1
      }
    },
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
