<template>
  <PageContainer title="title" :primary-page="false">
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
    </div>
  </PageContainer>
</template>

<script>
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    ListItem
  },
  // computed: {
  //   title() {
  //     return this.subtopic ? this.subtopic.title : '...'
  //   }
  // },
  computed: {
    lessons() {
      if (
        this.$store.state.lessons[this.$route.params.topic] &&
        this.$store.state.lessons[this.$route.params.topic][
          this.$route.params.subtopic
        ]
      ) {
        return this.$store.state.lessons[this.$route.params.topic][
          this.$route.params.subtopic
        ]
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
    this.$store.dispatch('fetchLessons', {
      topic: this.$route.params.topic,
      subtopic: this.$route.params.subtopic
    })
  }
}
</script>

<style></style>
