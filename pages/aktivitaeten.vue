<template>
  <PageContainer :title="title">
    <div>Test</div>
  </PageContainer>
</template>

<script>
export default {
  data() {
    return {
      title: 'Aktivitäten'
    }
  },
  middleware: 'auth'
}
</script>
