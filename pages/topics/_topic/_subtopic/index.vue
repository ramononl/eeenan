<template>
  <PageContainer
    :title="title"
    :back-button="{
      backText: topicTitle,
      backLink: `/topics/${this.$route.params.topic}`
    }"
    :close-button="fromTodo"
    class="z-10"
  >
    <div
      v-if="lessons"
      class="border-t border-b border-gray-300 divide-y divide-gray-300"
    >
      <div class="bg-gray-500">
        <div
          class="h-48 -mt-16 bg-right bg-no-repeat bg-cover opacity-75"
          :style="backgroundImage"
        ></div>
      </div>
      <ListItem
        v-for="lesson in lessons"
        :key="lesson.id"
        :link="
          `/topics/${$route.params.topic}/${$route.params.subtopic}/${lesson.id}`
        "
        :query="
          startWithStory($route.params.topic, $route.params.subtopic, lesson.id)
        "
        ><ListItemTopic :finished="finished(lesson.id)">{{
          lesson.title
        }}</ListItemTopic></ListItem
      >
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
import startWithStory from '~/mixins/startWithStory'
import ListItem from '~/components/common/ListItem'
import ListItemTopic from '~/components/common/ListItemTopic'

export default {
  components: {
    ListItem,
    ListItemTopic
  },
  mixins: [startWithStory],
  computed: {
    fromTodo() {
      return Object.hasOwnProperty.call(this.$route.query, 'from')
    },
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
    },
    backgroundImage() {
      const path = require(`~/assets/images/topics/${this.$route.params.topic}.png`)
      return {
        backgroundImage: `url(${path})`
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
    }
  },
  transition(to, from) {
    if (from) {
      if (from.name === 'start') {
        return {
          name: 'slide-up',
          mode: 'in-out'
        }
      }
    }
    if (to) {
      if (to.name === 'start' && from.query.from === 'todo') {
        return {
          name: 'slide-down',
          mode: 'in-out'
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.slide-up-enter-active,
.slide-down-leave-active {
  @apply transform transition-transform duration-500 ease-in-out;
}

.slide-up-enter,
.slide-down-leave-to {
  @apply translate-y-full;
}
</style>
