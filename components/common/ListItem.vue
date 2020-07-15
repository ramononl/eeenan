<template>
  <nuxt-link :to="nuxtLink" class="block px-4 py-3 bg-white">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    link: {
      type: String,
      default: '/'
    },
    query: {
      type: Object,
      default: null
    }
  },
  computed: {
    nuxtLink() {
      return this.query
        ? { path: this.link, query: { [this.query.query]: this.query.value } }
        : { path: this.link }
    }
  }
}
</script>

<style></style>
