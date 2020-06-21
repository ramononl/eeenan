<template>
  <div>
    <TitleBar :title="title" />
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
    }
  }
}
</script>

<style></style>
