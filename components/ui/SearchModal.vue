<template>
  <div>
    <label for="search" class="sr-only">Suchen...</label>
    <input
      id="search"
      type="search"
      class="block w-full px-3 py-2 text-base leading-6 appearance-none rounded-b-md focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-50"
      placeholder="Suchen..."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Schnellsuche'
    }
  },
  created() {
    this.$emit('get-title', this.title)
  }
}
</script>

<style></style>
