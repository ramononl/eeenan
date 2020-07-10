<template>
  <nuxt-link
    :to="link"
    append
    class="flex items-center justify-between px-4 py-3 space-x-2 bg-white"
  >
    <div class="flex items-center space-x-2">
      <!-- <svg
        class="w-10 h-10 mx-auto text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="8" />
      </svg> -->
      <AppIcon
        v-if="finished"
        :size="10"
        icon="CheckCircle"
        color="orange-500"
      />
      <AppIcon v-else :size="10" icon="Play" color="gray-300" />
      <p class="text-lg">{{ title }}</p>
    </div>
    <div>
      <AppIcon :size="8" icon="ChevronRight" />
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
    },
    finished: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
