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
  }
}
</script>
