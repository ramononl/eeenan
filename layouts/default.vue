<template>
  <div>
    <nuxt />
    <NavTabBar />
    <ModalContainer />
  </div>
</template>

<script>
import NavTabBar from '~/components/layout/NavTabBar'
import ModalContainer from '~/components/common/ModalContainer'

export default {
  components: {
    NavTabBar,
    ModalContainer
  },
  mounted() {
    if (Object.keys(this.$store.state.user.finishedStories).length === 0) {
      this.$store.dispatch('user/setFinishedStories')
    }
    if (Object.keys(this.$store.state.user.bookmarks).length === 0) {
      this.$store.dispatch('user/setBookmarks')
    }
  }
}
</script>
