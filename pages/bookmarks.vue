<template>
  <PageContainer :title="title">
    <div v-if="bookmarks">
      <div class="px-4 uppercase">HTML</div>
      <div
        class="mt-1 border-t border-b border-gray-300 divide-y divide-gray-300"
      >
        <ListItem />
        <div v-if="bookmarks">
          {{ bookmarks }}
        </div>
      </div>
    </div>
    <MissingContent v-else />
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
  computed: {
    bookmarks() {
      const bookmarks = this.$store.state.user.bookmarks
      if (bookmarks.length > 0) {
        return bookmarks
      } else {
        return false
      }
    }
  },
  middleware: 'auth'
}
</script>
