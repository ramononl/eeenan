<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-10 flex items-stretch w-full h-24 pb-4 bg-white shadow-top"
  >
    <nuxt-link
      to="/"
      exact
      class="flex items-center justify-center flex-1 text-xs font-semibold"
      ><span class="flex flex-col items-center"
        ><svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path></svg
        ><span>Start</span></span
      ></nuxt-link
    >
    <nuxt-link
      to="/topics"
      class="flex items-center justify-center flex-1 text-xs font-semibold"
      ><span class="flex flex-col items-center"
        ><svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path></svg
        ><span>Themen</span></span
      ></nuxt-link
    >
    <nuxt-link
      to="/bookmarks"
      class="flex items-center justify-center flex-1 text-xs font-semibold"
      ><span class="flex flex-col items-center"
        ><svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path></svg
        ><span>Merkliste</span></span
      ></nuxt-link
    >
    <nuxt-link
      to="/activities"
      class="flex items-center justify-center flex-1 text-xs font-semibold"
      ><span class="flex flex-col items-center"
        ><svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          ></path></svg
        ><span>Aktivitäten</span></span
      ></nuxt-link
    >
  </nav>
</template>

<script>
export default {}
</script>

<style></style>
