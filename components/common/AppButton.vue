<template>
  <component
    :is="type"
    :to="to"
    class="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-orange-100 transition duration-150 ease-in-out bg-orange-500 border border-transparent rounded-lg shadow-sm focus:outline-none focus:border-orange-600 focus:shadow-outline-orange disabled:bg-orange-400 disabled:cursor-not-allowed"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null
    }
  },
  computed: {
    type() {
      if (this.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    }
  }
}
</script>

<style></style>
