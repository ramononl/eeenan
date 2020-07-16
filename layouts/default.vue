<template>
  <client-only>
    <div>
      <nuxt />
      <NavTabBar />
      <ModalContainer />
    </div>
  </client-only>
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
    if (this.$store.state.auth.user) {
      if (Object.keys(this.$store.state.user.finishedStories).length === 0) {
        this.$store.dispatch('user/setFinishedStories')
      }
      if (Object.keys(this.$store.state.user.bookmarks).length === 0) {
        this.$store.dispatch('user/setBookmarks')
      }
      if (!this.$store.state.user.immClass) {
        this.$store.dispatch('user/setClass')
      }
      if (
        !this.$store.state.user.firstName &&
        !this.$store.state.user.lastName
      ) {
        this.$store.dispatch('user/setNames')
      }
      if (!this.$store.state.user.email) {
        this.$store.dispatch('user/setEmail')
      }
    }
  }
}
</script>
