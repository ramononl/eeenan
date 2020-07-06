<template>
  <PageContainer title="title" :primary-page="false">
    <div>
      <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
        <ListItem
          v-for="lesson in lessons"
          :key="lesson.id"
          :title="lesson.title"
          :link="lesson.id"
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
      return this.$store.state.lessons
    }
  },
  created() {
    this.$store.dispatch('fetchLessons', {
      topic: this.$route.params.topic,
      subtopic: this.$route.params.subtopic
    })
  }
}
</script>

<style></style>
