<template>
  <nuxt-link
    :to="nuxtLink"
    class="flex flex-col justify-between flex-none w-64 overflow-hidden bg-white border rounded-lg shadow-md min-h-20"
  >
    <div class="p-3">
      <div class="flex items-center space-x-1">
        <div class="w-2 h-2 rounded-sm" :class="`bg-${lesson.color}-400`"></div>
        <span
          class="text-xs font-semibold leading-none tracking-wide text-gray-700 uppercase"
          >{{ lesson.topic }}</span
        >
      </div>
      <div class="mt-2">
        <div class="font-medium leading-tight">
          {{ lesson.subtopic }}
        </div>
        <div class="text-sm leading-tight text-gray-700">
          {{ lesson.lesson }}
        </div>
      </div>
    </div>
    <div class="h-1.5 bg-gray-100">
      <div
        class="h-full bg-gray-300"
        :style="{ width: lesson.progress + '%' }"
      ></div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    lesson: {
      type: Object,
      default: null
    },
    query: {
      type: Object,
      default: null
    }
  },
  computed: {
    nuxtLink() {
      return {
        path: `topics/${this.lesson.topicId}/${this.lesson.subtopicId}/${this.lesson.lessonId}`,
        query: { [this.query.query]: this.query.value }
      }
    }
  }
}
</script>
