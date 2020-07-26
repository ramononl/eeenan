<template>
  <div class="px-4">
    <div v-html="story.question"></div>
    <div class="mt-4 overflow-hidden rounded-lg shadow-sm">
      <draggable v-model="itemsShuffled" handle=".handle" @sort="checkAnswer">
        <div
          v-for="(item, index) in itemsShuffled"
          :key="index"
          class="overflow-hidden text-sm bg-gray-800 border-b border-gray-700 last:border-b-0"
        >
          <div class="flex items-center justify-between">
            <pre
              v-highlightjs="item"
              class="flex-shrink overflow-x-auto"
            ><code :class="story.language"></code></pre>
            <div class="flex-none px-2 handle">
              <AppIcon :size="8" icon="MenuAlt" color="gray-600" />
            </div>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    story: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      itemsShuffled: null,
      isCorrect: null
    }
  },
  mounted() {
    const items = JSON.parse(JSON.stringify(this.story.items))
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[items[i], items[j]] = [items[j], items[i]]
    }
    this.itemsShuffled = items
    this.checkAnswer()
  },
  methods: {
    arraysMatch(arr1, arr2) {
      if (arr1.length !== arr2.length) return false
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
      }
      return true
    },
    checkAnswer() {
      this.isCorrect = this.arraysMatch(this.itemsShuffled, this.story.items)
      this.$emit('changed-answer', {
        id: this.story.id,
        isCorrect: this.isCorrect
      })
    },
    reset() {
      this.isCorrect = null
    }
  }
}
</script>

<style></style>
