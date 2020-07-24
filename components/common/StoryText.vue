<template>
  <div>
    <div class="px-4" v-html="story.content"></div>
    <pre
      v-if="story.example"
      v-highlightjs
      class="mt-2"
    ><code :class="story.language">{{ story.example }}</code></pre>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      default: null
    }
  }
}
</script>

<style></style>
