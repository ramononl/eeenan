<template>
  <div
    class="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-2 py-4 bg-white border-b"
  >
    <div v-if="backButton" class="flex-1">
      <button
        class="flex items-center focus:outline-none"
        type="button"
        @click="$router.push(backButton.backLink)"
      >
        <AppIcon :size="8" icon="ChevronLeft" />
        <span class="leading-tight text-left">{{ backButton.backText }}</span>
      </button>
    </div>
    <h1
      class="leading-none"
      :class="[!backButton ? 'text-3xl pl-2' : 'flex-1 text-center text-xl']"
    >
      {{ title }}
    </h1>
    <div v-if="backButton" class="flex-1"></div>
    <div v-if="!backButton" class="flex pr-2 space-x-4">
      <button
        type="button"
        style="focus:outline-none focus:opacity-75"
        @click="openModal('SearchModal')"
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
      <button
        type="button"
        style="focus:outline-none focus:opacity-75"
        @click="openModal('SettingsModal')"
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Titel'
    },
    backButton: {
      type: Object,
      default: null
    }
  },
  methods: {
    openModal(modalName) {
      this.$store.commit('modals/openModal', modalName)
    }
  }
}
</script>

<style></style>
