<template>
  <div
    v-if="message"
    :class="[
      message.success ? 'text-green-800 bg-green-50' : 'text-red-800 bg-red-50'
    ]"
    class="flex items-center px-3 py-2 mt-4 space-x-2 text-sm font-medium leading-tight rounded-lg"
  >
    <AppIcon
      v-if="message.success"
      :size="6"
      icon="CheckCircle"
      color="green-400"
      class="flex-none"
    />
    <AppIcon
      v-else
      :size="6"
      icon="XCircle"
      color="red-400"
      class="flex-none"
    />
    <span>{{ message.text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: null
    }
  }
}
</script>
