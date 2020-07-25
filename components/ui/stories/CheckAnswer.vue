<template>
  <transition name="zoom">
    <div
      v-if="display"
      class="absolute bottom-0 flex items-center justify-center w-full mb-4"
    >
      <div
        v-if="display === 'correct'"
        class="flex items-center py-1 pl-2 pr-3 space-x-2 bg-green-500 rounded-full"
      >
        <div
          class="flex items-center justify-center w-4 h-4 bg-green-100 rounded-full"
        >
          <AppIcon :size="3" icon="Check" color="green-500" />
        </div>
        <span
          class="text-xs font-semibold leading-none tracking-wide text-green-100 uppercase"
          >Korrekt</span
        >
      </div>
      <div
        v-if="display === 'wrong'"
        class="flex items-center py-1 pl-2 pr-3 space-x-2 bg-red-500 rounded-full"
      >
        <div
          class="flex items-center justify-center w-4 h-4 bg-red-100 rounded-full"
        >
          <AppIcon :size="3" icon="X" color="red-500" />
        </div>
        <span
          class="text-xs font-semibold leading-none tracking-wide text-red-100 uppercase"
          >Falsch</span
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    display: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="postcss">
.zoom-enter-active,
.zoom-leave-active {
  @apply transform transition-all duration-300 ease-in-out;
}

.zoom-enter,
.zoom-leave-to {
  @apply scale-0 opacity-0;
}
</style>
