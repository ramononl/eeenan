export default {
  methods: {
    startWithStory(topicId, subtopicId, lessonId) {
      const storiesInLesson = this.$getNested(
        this.$store.state.stories,
        topicId,
        subtopicId,
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
