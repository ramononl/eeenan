<template>
  <div>
    <input
      id="search"
      type="search"
      class="block w-full px-3 py-2 text-base leading-10 appearance-none rounded-b-md focus:outline-none"
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
