<template>
  <PageContainer :title="title" :primary-page="false">
    <div>
      <!-- <div
        v-if="topic && topic.subtopics.length > 0"
        class="border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem
          v-for="subtopic in topic.subtopics"
          :key="subtopic.id"
          :title="subtopic.title"
          :link="subtopic.slug"
        />
      </div>
      <div v-else class="px-4">Keine Inhalte</div> -->
    </div>
  </PageContainer>
</template>

<script>
// import ListItem from '~/components/common/ListItem'

export default {
  components: {
    // ListItem
  }
  // computed: {
  //   title() {
  //     return this.topic ? this.topic.title : '...'
  //   }
  // },
}
</script>

<style></style>
