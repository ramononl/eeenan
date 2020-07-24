<template>
  <div
    class="flex items-center mt-4 overflow-hidden bg-orange-500 divide-x divide-orange-100 rounded-lg h-14"
  >
    <button
      :disabled="disabledButtons.prev"
      type="button"
      class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="prevStory"
    >
      <AppIcon
        :size="5"
        icon="ArrowLeft"
        :color="disabledButtons.prev ? 'gray-100' : 'orange-100'"
      />
    </button>
    <button
      :disabled="disabledButtons.check"
      type="button"
      class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="checkAnswer"
    >
      <AppIcon
        :size="5"
        icon="Eye"
        :color="disabledButtons.check ? 'gray-100' : 'orange-100'"
      />
    </button>
    <button
      v-if="!lastStory"
      :disabled="disabledButtons.next"
      type="button"
      class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="nextStory"
    >
      <AppIcon
        :size="5"
        icon="ArrowRight"
        :color="disabledButtons.next ? 'gray-100' : 'orange-100'"
      />
    </button>
    <button
      v-else
      :disabled="disabledButtons.finish"
      type="button"
      class="flex items-center justify-center flex-1 h-full p-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="finishLesson"
    >
      <span
        class="text-sm font-semibold leading-none"
        :class="[disabledButtons.finish ? 'text-gray-100' : 'text-orange-100']"
        >Lektion abschliessen</span
      >
    </button>
  </div>
</template>

<script>
export default {
  props: {
    stories: {
      type: Array,
      default: null
    },
    currentStory: {
      type: Number,
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: null
    },
    check: {
      type: String,
      default: null
    }
  },
  computed: {
    lastStory() {
      return this.currentStory >= this.stories.length
    },
    isQuestion() {
      if (this.stories.length > 0) {
        const questionTypes = ['StoryQuiz', 'StorySort']
        return questionTypes.includes(this.stories[this.currentStory - 1].type)
      } else {
        return false
      }
    },
    disabledButtons() {
      return {
        prev: this.currentStory === 1,
        check:
          !this.isQuestion ||
          this.isCorrect === null ||
          this.check === 'correct',
        next: this.isQuestion && this.check !== 'correct',
        finish: this.isQuestion && this.check !== 'correct'
      }
    }
  },
  methods: {
    prevStory() {
      this.$emit('prev-story')
    },
    checkAnswer() {
      this.$emit('check-answer')
    },
    nextStory() {
      this.$emit('next-story')
    },
    finishLesson() {
      this.$emit('finish-lesson')
    }
  }
}
</script>

<style></style>
