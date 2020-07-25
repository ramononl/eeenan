<template>
  <div class="relative">
    <div class="flex items-center justify-between font-semibold text-gray-100">
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
            color="gray-600"
            class="stroke-gray-600"
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
            class="stroke-gray-600"
          />
        </button>
      </div>
      <div class="flex items-center justify-center flex-1 text-gray-600">
        <span>{{ title }}</span>
      </div>
      <div class="flex-1 text-right">
        <button class="focus:outline-none" @click="closeStories">
          <AppIcon :size="8" icon="X" color="gray-600" />
        </button>
      </div>
    </div>
    <div class="flex mt-6 space-x-2">
      <div
        v-for="i in total"
        :key="i"
        :class="[i <= current ? 'bg-gray-600' : 'bg-gray-400']"
        class="flex-1 h-1 rounded-full"
      ></div>
    </div>
    <transition name="fade-down">
      <div
        v-if="showAddedToBookmarks"
        class="absolute top-0 flex justify-center w-full -mt-0.5"
        @click="showAddedToBookmarks = false"
      >
        <div
          class="flex items-center px-4 py-3 space-x-2 bg-gray-100 border border-gray-400 rounded-full"
        >
          <div
            class="flex items-center justify-center w-4 h-4 bg-green-500 rounded-full"
          >
            <AppIcon :size="3" icon="Check" color="white" />
          </div>
          <span class="text-sm font-semibold leading-none text-gray-600"
            >Der Merkliste hinzugefügt</span
          >
        </div>
      </div>
    </transition>
    <transition name="fade-down">
      <div
        v-if="showRemovedFromBookmarks"
        class="absolute top-0 flex justify-center w-full -mt-0.5"
        @click="showRemovedFromBookmarks = false"
      >
        <div
          class="flex items-center px-4 py-3 space-x-2 bg-gray-100 border border-gray-400 rounded-full"
        >
          <div
            class="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full"
          >
            <AppIcon :size="3" icon="X" color="white" />
          </div>
          <span class="text-sm font-semibold leading-none text-gray-600"
            >Aus Merkliste entfernt</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    bookmarked: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    total: {
      type: Number,
      default: null
    },
    current: {
      type: Number,
      default: null
    },
    currentId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showAddedToBookmarks: false,
      showRemovedFromBookmarks: false
    }
  },
  methods: {
    addBookmark() {
      this.$store.dispatch('user/addBookmark', this.currentId)
      this.showAddedToBookmarks = true
      setTimeout(() => (this.showAddedToBookmarks = false), 2000)
    },
    removeBookmark() {
      this.$store.dispatch('user/removeBookmark', this.currentId)
      this.showRemovedFromBookmarks = true
      setTimeout(() => (this.showRemovedFromBookmarks = false), 2000)
    },
    closeStories() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="postcss">
.fade-down-enter-active,
.fade-down-leave-active {
  @apply transform transition-all duration-300 ease-in-out;
}

.fade-down-enter,
.fade-down-leave-to {
  @apply -translate-y-full opacity-0;
}
</style>
