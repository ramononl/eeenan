<template>
  <div class="px-4">
    <div v-html="story.question"></div>
    <div class="mt-4 overflow-hidden rounded-lg shadow-sm">
      <draggable>
        <div
          v-for="(item, index) in itemsShuffled"
          :key="index"
          class="overflow-hidden text-sm bg-gray-800 border-b border-gray-700 last:border-b-0"
        >
          <div class="flex items-center justify-between">
            <pre
              v-highlightjs
            ><code :class="story.language">{{ item }}</code></pre>
            <div class="px-2">
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
  computed: {
    itemsShuffled() {
      const items = JSON.parse(JSON.stringify(this.story.items))
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[items[i], items[j]] = [items[j], items[i]]
      }
      return items
    }
  }
}
</script>

<style></style>
