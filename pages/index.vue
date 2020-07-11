<template>
  <PageContainer :title="title">
    <div class="pb-4 overflow-x-auto overflow-y-visible scrolling-touch">
      <div class="inline-flex flex-no-wrap px-4 space-x-4">
        <nuxt-link
          v-for="i in 6"
          :key="i"
          to="/cards"
          class="flex-none w-48 h-20 px-3 py-2 bg-white rounded-md shadow-md"
        >
          HTML Tabellen
        </nuxt-link>
      </div>
    </div>
    <div class="mt-4 space-y-4">
      <div class="p-4 bg-white">
        <h2 class="text-3xl font-bold">To-Dos</h2>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
      </div>
      <div class="p-4 bg-white">
        <h2 class="text-3xl font-bold">To-Dos</h2>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
      </div>
      <div class="p-4 bg-white">
        <h2 class="text-3xl font-bold">To-Dos</h2>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
      </div>
      <div class="p-4 bg-white">
        <h2 class="text-3xl font-bold">To-Dos</h2>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
      </div>
      <div class="p-4 bg-white">
        <h2 class="text-3xl font-bold">To-Dos</h2>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
        <p>Videotutorials 1–3 ansehen</p>
      </div>
    </div>
  </PageContainer>
</template>

<script>
export default {
  data() {
    return {
      title: 'Startseite'
    }
  },
  middleware: 'auth'
}
</script>
