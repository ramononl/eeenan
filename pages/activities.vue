<template>
  <PageContainer :title="title">
    <div v-if="finishedStories">
      {{ finishedStories }}
    </div>
    <MissingContent v-else />
  </PageContainer>
</template>

<script>
export default {
  data() {
    return {
      title: 'Aktivitäten'
    }
  },
  computed: {
    finishedStories() {
      const finishedStories = this.$store.state.user.finishedStories
      if (Object.keys(finishedStories).length !== 0) {
        return finishedStories
      } else {
        return false
      }
    }
  },
  middleware: 'auth'
}
</script>
