<template>
  <div>
    <TitleBar :title="title" :back-button="backButton" />
    <ContentBox>
      <slot />
    </ContentBox>
  </div>
</template>

<script>
import TitleBar from '~/components/layout/TitleBar'
import ContentBox from '~/components/layout/ContentBox'

export default {
  components: {
    TitleBar,
    ContentBox
  },
  props: {
    title: {
      type: String,
      default: 'Titel'
    },
    backButton: {
      type: Object,
      default: null
    }
  }
}
</script>

<style></style>
