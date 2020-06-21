<template>
  <PageContainer :title="title">
    <div class="border-t border-b border-gray-300 divide-y divide-gray-300">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
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
      title: 'Kategorien'
    }
  }
}
</script>
