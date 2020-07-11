<template>
  <PageContainer
    :title="title"
    :back-button="{
      backText: topicTitle,
      backLink: `/topics/${this.$route.params.topic}`
    }"
  >
    <div>
      <div
        v-if="lessons"
        class="border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem
          v-for="lesson in lessons"
          :key="lesson.id"
          :title="lesson.title"
          :link="lesson.id"
          :finished="finished(lesson.id)"
        />
        <!-- :finished="true" -->
      </div>
      <div v-else>Loading</div>
    </div>
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
      if (Object.keys(this.$store.state.topics).length !== 0) {
        return this.$store.state.topics[this.$route.params.topic].title
      } else {
        return '...'
      }
    },
    title() {
      if (Object.keys(this.$store.state.subtopics).length !== 0) {
        return this.$store.state.subtopics[this.$route.params.topic][
          this.$route.params.subtopic
        ].title
      } else {
        return '...'
      }
    },
    lessons() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.lessons,
          this.$route.params.topic
        )
      ) {
        if (
          Object.prototype.hasOwnProperty.call(
            this.$store.state.lessons[this.$route.params.topic],
            this.$route.params.subtopic
          )
        ) {
          const lessons = this.$store.state.lessons[this.$route.params.topic][
            this.$route.params.subtopic
          ]
          const lessonsArray = Object.keys(lessons).map((key) => {
            return { id: key, ...lessons[key] }
          })
          lessonsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
          return lessonsArray
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    finished(lessonId) {
      const topic = this.$route.params.topic
      const subtopic = this.$route.params.subtopic
      const storiesInLesson = Object.keys(
        this.$store.state.stories[topic][subtopic][lessonId]
      )
      const finishedStories = Object.keys(
        this.$store.state.user.finishedStories
      )
      const allStoriesFinished = storiesInLesson.every((val) =>
        finishedStories.includes(val)
      )
      return allStoriesFinished
    }
  },
  middleware: 'auth'
}
</script>

<style></style>
