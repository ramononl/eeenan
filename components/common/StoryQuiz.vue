<template>
  <div class="px-4">
    <div v-html="story.question"></div>
    <div class="mt-4 space-y-2">
      <button
        v-for="(answer, index) in story.answers"
        :key="index"
        type="button"
        class="w-full px-4 py-3 text-left bg-white border rounded-lg shadow-sm focus:outline-none"
        :class="[
          selectedAnswerIndex === index ? 'border-gray-700 bg-gray-300' : ''
        ]"
        @click="selectAnswer(index)"
      >
        <span>{{ answer }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selectedAnswerIndex: null
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedAnswerIndex = index
      const isCorrect = index === this.story.correct
      this.$emit('changed-answer', isCorrect)
    }
  }
}
</script>

<style></style>
