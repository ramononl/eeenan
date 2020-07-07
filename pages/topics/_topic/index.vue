<template>
  <PageContainer :title="title" :primary-page="false">
    <div>
      <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
        <ListItem
          v-for="subtopic in subtopics"
          :key="subtopic.id"
          :title="subtopic.title"
          :link="subtopic.id"
        />
      </div>
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
      if (Object.keys(this.$store.state.topics).length) {
        return this.$store.state.topics[this.$route.params.topic].title
      } else {
        return '...'
      }
    },
    subtopics() {
      if (this.$store.state.subtopics[this.$route.params.topic]) {
        return this.$store.state.subtopics[this.$route.params.topic]
      } else {
        return false
      }
    }
  },
  created() {
    if (!Object.keys(this.$store.state.topics).length) {
      this.$store.dispatch('fetchTopics')
    }
    if (!this.$store.state.subtopics[this.$route.params.topic]) {
      this.$store.dispatch('fetchSubtopics', {
        topic: this.$route.params.topic
      })
    }
  }
}
</script>

<style></style>
