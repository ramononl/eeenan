<template>
  <component
    :is="type"
    :to="to"
    class="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600"
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
