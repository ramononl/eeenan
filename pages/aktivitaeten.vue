<template>
  <PageContainer :title="title">
    <div>Test</div>
  </PageContainer>
</template>

<script>
import PageContainer from '~/components/layout/PageContainer'

export default {
  components: {
    PageContainer
  },
  data() {
    return {
      title: 'Aktivitäten'
    }
  }
}
</script>
