<template>
  <div>
    <nuxt />
    <NavTabBar />
    <ModalContainer />
  </div>
</template>

<script>
import NavTabBar from '~/components/layout/NavTabBar'
import ModalContainer from '~/components/ui/SettingsModal/ModalContainer'

export default {
  components: {
    NavTabBar,
    ModalContainer
  }
}
</script>
