<template>
  <button
    type="button"
    class="flex items-center justify-between w-full py-2 space-x-2 focus:outline-none"
  >
    <div class="flex items-center space-x-2">
      <AppIcon :size="6" :icon="icon" color="gray-700" />
      <p class="font-medium leading-tight">
        <slot />
      </p>
    </div>
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'X'
    }
  }
}
</script>
