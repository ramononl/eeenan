<template>
  <div
    class="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-2 py-4 bg-white border-b"
  >
    <div v-if="backButton" class="flex-1">
      <button
        class="flex items-center -space-x-1 focus:outline-none"
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
        class="focus:outline-none focus:opacity-75"
        @click="openModal('SearchModal')"
      >
        <AppIcon :size="9" icon="Search" color="gray-500" />
      </button>
      <button
        type="button"
        class="focus:outline-none focus:opacity-75"
        @click="openModal('SettingsModal')"
      >
        <AppIcon :size="9" icon="Cog" color="gray-500" />
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
