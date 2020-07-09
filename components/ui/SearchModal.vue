<template>
  <div>
    <input
      id="search"
      type="search"
      class="block w-full px-3 py-4 text-base leading-6 appearance-none rounded-b-md focus:outline-none"
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
  mounted() {
    this.$emit('get-title', this.title)
  }
}
</script>

<style></style>
