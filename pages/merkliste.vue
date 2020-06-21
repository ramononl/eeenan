<template>
  <PageContainer :title="title">
    <div class="px-4 uppercase">HTML</div>
    <div
      class="mt-1 border-t border-b border-gray-300 divide-y divide-gray-300"
    >
      <ListItem />
    </div>
  </PageContainer>
</template>

<script>
import PageContainer from '~/components/layout/PageContainer'
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    PageContainer,
    ListItem
  },
  data() {
    return {
      title: 'Merkliste'
    }
  }
}
</script>
