<template>
  <div>
    <div class="px-4" v-html="story.content"></div>
    <pre
      v-if="story.example"
      v-highlightjs="story.example"
      class="mt-4"
    ><code :class="story.language"></code></pre>
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

<style lang="postcss" scoped>
>>> p:not(:first-of-type) {
  @apply mt-2;
}

>>> ul {
  @apply mr-1 list-outside list-disc pl-6 text-sm mt-2;
}
</style>
