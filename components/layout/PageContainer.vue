<template>
  <div>
    <TitleBar :title="title" :back-button="backButton" />
    <ContentBox :class="[paddingX ? 'px-4' : '']">
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
    },
    paddingX: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
