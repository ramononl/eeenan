<template>
  <div class="flex items-center justify-between space-x-2">
    <div class="flex items-center space-x-2">
      <AppIcon
        v-if="finished"
        :size="10"
        icon="CheckCircle"
        color="orange-500"
      />
      <AppIcon v-else :size="10" icon="Play" color="gray-300" />
      <p class="text-lg">
        <slot />
      </p>
    </div>
    <div>
      <AppIcon :size="8" icon="ChevronRight" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    finished: {
      type: Boolean,
      default: false
    }
  }
}
</script>
