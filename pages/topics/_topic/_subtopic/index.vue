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
          v-for="(lesson, name) in lessons"
          :key="name"
          :title="lesson.title"
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
  // computed: {
  //   title() {
  //     return this.subtopic ? this.subtopic.title : '...'
  //   }
  // },
  computed: {
    topicTitle() {
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
    title() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.$store.state.subtopics,
          this.$route.params.topic
        )
      ) {
        if (
          Object.prototype.hasOwnProperty.call(
            this.$store.state.subtopics[this.$route.params.topic],
            this.$route.params.subtopic
          )
        ) {
          return this.$store.state.subtopics[this.$route.params.topic][
            this.$route.params.subtopic
          ].title
        } else {
          return '...'
        }
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
          return this.$store.state.lessons[this.$route.params.topic][
            this.$route.params.subtopic
          ]
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  mounted() {
    this.fetchTopics()
    this.fetchSubtopics()
    this.fetchLessons()
  }
}
</script>

<style></style>
