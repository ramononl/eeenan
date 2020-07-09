<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    :class="iconClasses"
  >
    <keep-alive>
      <component :is="iconName"></component>
    </keep-alive>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: 'X'
    },
    button: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,
      default: 5
    },
    color: {
      type: String,
      required: false,
      default: 'gray-900'
    }
  },
  computed: {
    iconName() {
      return `Icon${this.icon}`
    },
    iconClasses() {
      if (this.insideButton) {
        return `w-${this.size} h-${this.size} text-${this.color} mr-3 -ml-1`
      } else {
        return `w-${this.size} h-${this.size} text-${this.color}`
      }
    }
  }
}
</script>

<style scoped>
svg {
  @apply cursor-pointer;
  @apply inline-block;
}
</style>
