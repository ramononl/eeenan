<template>
  <PageContainer
    :title="title"
    :back-button="{ backText: 'Themen', backLink: '/topics' }"
  >
    <div
      v-if="subtopics"
      class="border-t border-b border-gray-300 divide-y divide-gray-300"
    >
      <div class="bg-gray-500">
        <img :src="imagePath" class="mb-6 -mt-16 opacity-75" />
      </div>
      <ListItem
        v-for="subtopic in subtopics"
        :key="subtopic.id"
        :link="`/topics/${$route.params.topic}/${subtopic.id}`"
        :finished="finished(subtopic.id)"
        >{{ subtopic.title }}</ListItem
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
    title() {
      const topicsStore = this.$store.state.topics
      const topic = this.$getNested(topicsStore, this.$route.params.topic)

      if (topic) {
        return topic.title
      } else {
        return '...'
      }
    },
    subtopics() {
      const subtopicsStore = this.$store.state.subtopics
      const subtopics = this.$getNested(
        subtopicsStore,
        this.$route.params.topic
      )

      if (subtopics) {
        const subtopicsArray = Object.keys(subtopics).map((key) => {
          return { id: key, ...subtopics[key] }
        })
        subtopicsArray.sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        return subtopicsArray
      } else {
        return false
      }
    },
    imagePath() {
      return require(`~/assets/images/topics/${this.$route.params.topic}.png`)
    }
  },
  methods: {
    finished(subtopicId) {
      const storiesStore = this.$store.state.stories
      const storiesInSubtopic = this.$getNested(
        storiesStore,
        this.$route.params.topic,
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
</script>

<style></style>
