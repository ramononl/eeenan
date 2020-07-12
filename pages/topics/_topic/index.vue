<template>
  <PageContainer
    :title="title"
    :back-button="{ backText: 'Themen', backLink: '/topics' }"
  >
    <div>
      <div
        v-if="subtopics"
        class="border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem
          v-for="subtopic in subtopics"
          :key="subtopic.id"
          :title="subtopic.title"
          :link="subtopic.id"
          :finished="finished(subtopic.id)"
        />
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
    title() {
      if (Object.keys(this.$store.state.topics).length !== 0) {
        return this.$store.state.topics[this.$route.params.topic].title
      } else {
        return '...'
      }
    },
    subtopics() {
      if (Object.keys(this.$store.state.subtopics).length !== 0) {
        const subtopics = this.$store.state.subtopics[this.$route.params.topic]
        const subtopicsArray = Object.keys(subtopics).map((key) => {
          return { id: key, ...subtopics[key] }
        })
        subtopicsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return subtopicsArray
      } else {
        return false
      }
    }
  },
  methods: {
    finished(subtopicId) {
      const topic = this.$route.params.topic
      const storiesInSubtopic = this.$store.state.stories[topic][subtopicId]
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
    }
  }
}
</script>

<style></style>
