<template>
  <client-only>
    <div
      class="absolute inset-0 overflow-x-hidden overflow-y-auto custom-h-screen"
    >
      <nuxt />
    </div>
  </client-only>
</template>

<script>
export default {
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(event) {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>

<style>
.custom-h-screen {
  @apply h-screen;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
