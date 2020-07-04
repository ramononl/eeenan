<template>
  <nuxt-link
    :to="link"
    append
    class="flex items-center justify-between px-4 py-2 space-x-2 bg-white"
  >
    <div class="flex items-center space-x-2">
      <svg
        class="w-10 h-10 mx-auto text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="8" />
      </svg>
      <p class="text-lg">{{ title }}</p>
    </div>
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
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
