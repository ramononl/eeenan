<template>
  <div
    class="absolute inset-x-0 z-40 flex items-center justify-between p-3 px-4 bg-white border-b h-14"
  >
    <div v-show="secondaryView" class="flex flex-1">
      <div class="flex items-center" @click="goBack">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>Zurück</span>
      </div>
    </div>
    <div v-show="!secondaryView" class="flex-1"></div>
    <h3 class="flex-1 text-lg font-semibold text-center">
      {{ modalTitle }}
    </h3>
    <div class="flex justify-end flex-1">
      <button
        type="button"
        class="focus:outline-none focus:opacity-75"
        @click="closeModal"
      >
        Fertig
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      default: 'Modal Titel'
    },
    secondaryView: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.goBack()
      this.$store.commit('modals/closeModal')
    },
    goBack() {
      this.$emit('secondary-view', false)
    }
  }
}
</script>

<style></style>
