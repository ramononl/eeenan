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
import ListItem from '~/components/common/ListItem'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      title: 'Merkliste'
    }
  },
  middleware: 'auth'
}
</script>
