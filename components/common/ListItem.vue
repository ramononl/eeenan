<template>
  <nuxt-link
    :to="nuxtLink"
    class="flex items-center justify-between px-4 py-3 space-x-2 bg-white"
  >
    <div class="flex items-center space-x-2">
      <AppIcon
        v-if="finished"
        :size="10"
        icon="CheckCircle"
        color="orange-500"
      />
      <AppIcon v-else :size="10" icon="Play" color="gray-300" />
      <p class="text-lg">
        <slot />
      </p>
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
