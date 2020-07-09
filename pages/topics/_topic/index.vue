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
          v-for="(subtopic, name) in subtopics"
          :key="name"
          :title="subtopic.title"
          :link="name"
        />
      </div>
      <div v-else>Loading</div>
    </div>
  </PageContainer>
</template>

<script>
import fetchDataDispatchers from '~/mixins/fetchDataDispatchers'
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    ListItem
  },
  mixins: [fetchDataDispatchers],
  computed: {
    title() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.topics,
          this.$route.params.topic
        )
      ) {
        return this.$store.state.topics[this.$route.params.topic].title
      } else {
        return '...'
      }
    },
    subtopics() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.subtopics,
          this.$route.params.topic
        )
      ) {
        return this.$store.state.subtopics[this.$route.params.topic]
      } else {
        return false
      }
    }
  },
  mounted() {
    this.fetchTopics()
    this.fetchSubtopics()
  },
  middleware: 'auth'
}
</script>

<style></style>
