<template>
  <nuxt-link :to="link" append class="px-4 py-8 bg-white rounded-md shadow-md">
    <svg
      class="w-10 h-10 mx-auto text-orange-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="8" />
    </svg>
    <div>
      <p class="text-lg text-center">{{ title }}</p>
    </div>
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
    }
  }
}
</script>

<style></style>
