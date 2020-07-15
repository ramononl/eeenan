<template>
  <nuxt-link
    :to="link"
    append
    class="block overflow-hidden rounded-lg shadow-md"
  >
    <div class="relative bg-gray-500">
      <img :src="imagePath" class="opacity-75" />
      <div class="absolute inset-0 flex items-center pl-6">
        <p class="text-xl font-bold leading-none text-white">{{ title }}</p>
      </div>
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
    img: {
      type: String,
      default: 'html'
    }
  },
  computed: {
    imagePath() {
      return require(`~/assets/images/topics/${this.img}.png`)
    }
  }
}
</script>

<style></style>
