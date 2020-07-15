export default {
  methods: {
    subtopicFinished(subtopicId, topicId) {
      const storiesStore = this.$store.state.stories
      const storiesInSubtopic = this.$getNested(
        storiesStore,
        topicId,
        subtopicId
      )
      if (storiesInSubtopic) {
        const stories = []
        Object.keys(storiesInSubtopic).forEach((lesson) => {
          Object.keys(storiesInSubtopic[lesson]).forEach((story) => {
            stories.push(story)
          })
        })
        const finishedStories = Object.keys(
          this.$store.state.user.finishedStories
        )
        const allStoriesFinished = stories.every((val) =>
          finishedStories.includes(val)
        )
        return allStoriesFinished
      } else {
        return false
      }
    }
  }
}
