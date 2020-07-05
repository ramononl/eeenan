<template>
  <PageContainer title="title" :primary-page="false">
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
  // computed: {
  //   title() {
  //     return this.topic ? this.topic.title : '...'
  //   }
  // },
  computed: {
    subtopics() {
      return this.$store.state.subtopics
    }
  },
  created() {
    this.$store.dispatch('fetchSubtopics', {
      subtopic: this.$route.params.subtopic
    })
  }
}
</script>

<style></style>
