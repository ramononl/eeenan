<template>
  <div class="flex flex-col h-full max-h-full px-4 pt-4 pb-10 bg-black">
    <div>
      <div
        class="flex items-center justify-between font-semibold text-gray-100"
      >
        <div class="flex-1">
          <button
            v-if="bookmarked"
            type="button"
            class="focus:outline-none"
            @click="removeBookmark"
          >
            <AppIcon
              :size="8"
              icon="Bookmark"
              color="gray-100"
              class="stroke-gray-100"
            />
          </button>
          <button
            v-else
            type="button"
            class="focus:outline-none"
            @click="addBookmark"
          >
            <AppIcon
              :size="8"
              icon="BookmarkOutline"
              color="transparent"
              class="stroke-gray-100"
            />
          </button>
        </div>
        <div class="flex items-center justify-center flex-1 text-gray-100">
          <span>{{ storiesData.lesson }}</span>
        </div>
        <div class="flex-1 text-right">
          <button class="focus:outline-none" @click="closeStories">
            <AppIcon :size="8" icon="X" color="gray-100" />
          </button>
        </div>
      </div>
      <div class="flex mt-6 space-x-2">
        <div
          v-for="i in storiesData.numberOfStories"
          :key="i"
          :class="[
            i <= storiesData.currentStory ? 'bg-gray-100' : 'bg-gray-700'
          ]"
          class="flex-1 h-1 rounded-full"
        ></div>
      </div>
    </div>
    <div class="relative flex-1 w-full mt-4">
      <transition name="cards-swipe">
        <div
          class="absolute inset-0 z-10 w-full p-4 overflow-y-auto origin-top transform bg-gray-100 rounded-lg"
        >
          <slot />
        </div>
      </transition>
    </div>
    <div
      class="flex items-center mt-4 overflow-hidden bg-orange-500 divide-x divide-orange-100 rounded-md h-14"
    >
      <button
        v-if="storiesData.currentStory !== 1"
        class="flex items-center justify-center flex-1 h-full focus:outline-none"
        @click="prevStory"
      >
        <AppIcon :size="5" icon="ArrowLeft" color="orange-100" />
      </button>
      <button
        v-if="storiesData.currentStory < storiesData.numberOfStories"
        class="flex items-center justify-center flex-1 h-full focus:outline-none"
        @click="nextStory"
      >
        <AppIcon :size="5" icon="ArrowRight" color="orange-100" />
      </button>
      <button
        v-else
        class="flex items-center justify-center flex-1 h-full focus:outline-none"
        @click="finishLesson"
      >
        <span class="font-medium leading-none text-orange-100"
          >Lektion abschliessen</span
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeLink: {
      type: String,
      default: '/'
    },
    storiesData: {
      type: Object,
      default() {
        return {
          subtopic: 'Subtopic',
          lesson: 'Lesson',
          numberOfStories: 2,
          currentStory: 1,
          currentStoryId: null
        }
      }
    }
  },
  computed: {
    bookmarked() {
      if (
        this.$store.state.user.bookmarks.includes(
          this.storiesData.currentStoryId
        )
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    nextStory() {
      if (this.storiesData.currentStory < this.storiesData.numberOfStories) {
        this.$emit('next-story')
      }
    },
    prevStory() {
      if (this.storiesData.currentStory > 1) {
        this.$emit('prev-story')
      }
    },
    addBookmark() {
      this.$store.dispatch('user/addBookmark', this.storiesData.currentStoryId)
    },
    removeBookmark() {
      this.$store.dispatch(
        'user/removeBookmark',
        this.storiesData.currentStoryId
      )
    },
    finishLesson() {
      this.$emit('finish-lesson')
      this.$router.push(this.closeLink)
    },
    closeStories() {
      this.$router.push(this.closeLink)
    }
  }
}
</script>

<style></style>
