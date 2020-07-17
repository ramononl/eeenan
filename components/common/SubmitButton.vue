<template>
  <AppButton
    type="submit"
    class="flex justify-center w-full"
    :disabled="loading"
  >
    <div v-if="loading">
      <div class="flex items-center">
        <span>&nbsp;</span>
        <AppIcon :size="5" icon="Spinner" class="spin-animation" />
        <span>&nbsp;</span>
      </div>
    </div>
    <span v-else>{{ text }}</span>
  </AppButton>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Submit Text'
    }
  }
}
</script>

<style lang="postcss">
.spin-animation {
  @apply transform;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
