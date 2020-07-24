<template>
  <div class="absolute inset-0">
    <TitleBar
      :title="title"
      :back-button="backButton"
      :close-button="closeButton"
    />
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
    closeButton: {
      type: Boolean,
      default: false
    },
    paddingX: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
