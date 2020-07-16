<template>
  <div>
    <form @submit.prevent="search">
      <input
        id="search"
        ref="search"
        name="search"
        type="search"
        class="block w-full px-1 py-3 text-base leading-6 rounded-b-lg appearance-none focus:outline-none"
        placeholder="Suchen..."
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Schnellsuche'
    }
  },
  mounted() {
    this.$emit('get-title', this.title)
    this.focusInput()
  },
  methods: {
    search() {
      console.log('search')
    },
    focusInput() {
      this.$refs.search.focus()
    }
  }
}
</script>

<style></style>
