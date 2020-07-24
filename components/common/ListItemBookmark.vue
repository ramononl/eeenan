<template>
  <div class="flex items-center justify-between py-2 space-x-2">
    <p class="text-lg">
      <slot />
    </p>
    <div class="flex items-center space-x-1">
      <div
        class="flex items-center justify-center w-6 h-6 text-sm font-semibold leading-none text-orange-500 border-2 border-orange-500 rounded-md"
      >
        <span class="font-bold">{{ ordering }}</span>
      </div>
      <div
        v-if="type === 'StoryText'"
        class="flex items-center justify-center w-6 h-6 text-sm font-semibold leading-none text-orange-500 border-2 border-orange-500 rounded-md"
      >
        <AppIcon :size="4" icon="LightBulb" color="orange-500" />
      </div>
      <div
        v-if="type === 'StorySort'"
        class="flex items-center justify-center w-6 h-6 text-sm font-semibold leading-none text-orange-500 border-2 border-orange-500 rounded-md"
      >
        <AppIcon :size="4" icon="MenuAlt" color="orange-500" />
      </div>
      <div
        v-if="type === 'StoryQuiz'"
        class="flex items-center justify-center w-6 h-6 text-sm font-semibold leading-none text-orange-500 border-2 border-orange-500 rounded-md"
      >
        <AppIcon :size="4" icon="Check" color="orange-500" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ordering: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'StoryText'
    }
  }
}
</script>
