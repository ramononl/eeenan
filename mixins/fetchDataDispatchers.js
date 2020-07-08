export default {
  methods: {
    fetchTopics() {
      if (Object.keys(this.$store.state.topics).length === 0) {
        this.$store.dispatch('fetchTopics')
      }
    },
    fetchSubtopics() {
      if (
        !Object.prototype.hasOwnProperty.call(
          this.$store.state.subtopics,
          this.$route.params.topic
        )
      ) {
        this.$store.dispatch('fetchSubtopics', {
          topic: this.$route.params.topic
        })
      }
    },
    fetchLessons() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.lessons,
          this.$route.params.topic
        )
      ) {
        if (
          !Object.prototype.hasOwnProperty.call(
            this.$store.state.lessons[this.$route.params.topic],
            this.$route.params.subtopic
          )
        ) {
          this.$store.dispatch('fetchLessons', {
            topic: this.$route.params.topic,
            subtopic: this.$route.params.subtopic
          })
        }
      } else {
        this.$store.dispatch('fetchLessons', {
          topic: this.$route.params.topic,
          subtopic: this.$route.params.subtopic
        })
      }
    },
    fetchStories() {
      this.$store.dispatch('fetchStories', {
        topic: this.$route.params.topic,
        subtopic: this.$route.params.subtopic,
        lesson: this.$route.params.lesson
      })
    }
  }
}
