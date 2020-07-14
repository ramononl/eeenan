<template>
  <PageContainer
    :title="title"
    :back-button="{
      backText: topicTitle,
      backLink: `/topics/${this.$route.params.topic}`
    }"
  >
    <div
      v-if="lessons"
      class="border-t border-b border-gray-300 divide-y divide-gray-300"
    >
      <ListItem
        v-for="lesson in lessons"
        :key="lesson.id"
        :link="
          `/topics/${$route.params.topic}/${$route.params.subtopic}/${lesson.id}`
        "
        :query="startWithStory(lesson.id)"
        :finished="finished(lesson.id)"
        >{{ lesson.title }}</ListItem
      >
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    ListItem
  },
  computed: {
    topicTitle() {
      const topicsStore = this.$store.state.topics
      const topic = this.$getNested(topicsStore, this.$route.params.topic)

      if (topic) {
        return topic.title
      } else {
        return '...'
      }
    },
    title() {
      const subtopicsStore = this.$store.state.subtopics
      const subtopic = this.$getNested(
        subtopicsStore,
        this.$route.params.topic,
        this.$route.params.subtopic
      )

      if (subtopic) {
        return subtopic.title
      } else {
        return '...'
      }
    },
    lessons() {
      const lessonsStore = this.$store.state.lessons
      const lessons = this.$getNested(
        lessonsStore,
        this.$route.params.topic,
        this.$route.params.subtopic
      )
      if (lessons) {
        const lessonsArray = Object.keys(lessons).map((key) => {
          return { id: key, ...lessons[key] }
        })
        lessonsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return lessonsArray
      } else {
        return false
      }
    }
  },
  methods: {
    finished(lessonId) {
      const storiesInLesson = this.$getNested(
        this.$store.state.stories,
        this.$route.params.topic,
        this.$route.params.subtopic,
        lessonId
      )
      if (storiesInLesson) {
        const storiesInLessonArray = Object.keys(storiesInLesson)
        const finishedStories = Object.keys(
          this.$store.state.user.finishedStories
        )
        const allStoriesFinished = storiesInLessonArray.every((val) =>
          finishedStories.includes(val)
        )
        return allStoriesFinished
      } else {
        return false
      }
    },
    startWithStory(lessonId) {
      const storiesInLesson = this.$getNested(
        this.$store.state.stories,
        this.$route.params.topic,
        this.$route.params.subtopic,
        lessonId
      )

      if (storiesInLesson) {
        const finishedStories = Object.keys(
          this.$store.state.user.finishedStories
        )
        const storiesInLessonArray = []

        Object.keys(storiesInLesson).forEach((key) => {
          const storyObj = {}
          storyObj.key = key
          storyObj.ordering = storiesInLesson[key].ordering
          storyObj.finished = finishedStories.includes(key)
          storiesInLessonArray.push(storyObj)
        })

        storiesInLessonArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))

        const allFinished = storiesInLessonArray.every(
          (element) => element.finished === true
        )

        if (allFinished) {
          return null
        } else {
          const firstUnfinished = storiesInLessonArray.find(
            (element) => element.finished === false
          )
          return { query: 'start', value: firstUnfinished.key }
        }
      } else {
        return null
      }
    }
  }
}
</script>

<style></style>
