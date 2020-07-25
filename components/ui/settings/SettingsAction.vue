<template>
  <div>
    <div v-if="item">
      <transition name="fade" mode="out-in">
        <button
          v-if="!confirmPrompt"
          type="button"
          class="flex items-center w-full py-2 space-x-2 focus:outline-none"
          @click="showConfirm"
        >
          <div
            class="flex items-center justify-center space-x-1 rounded w-7 h-7"
            :class="`bg-${color}-300`"
          >
            <AppIcon :size="5" :icon="icon" :color="`${color}-600`" />
          </div>
          <span
            class="font-semibold leading-tight text-left"
            :class="`text-${color}-600`"
          >
            <slot />
          </span>
        </button>
        <div v-else class="flex items-center w-full py-2 space-x-2">
          <div
            class="flex items-center w-full space-x-1 rounded focus:outline-none"
          >
            <button
              class="flex items-center justify-center flex-1 bg-gray-300 rounded h-7 focus:outline-none"
              @click="cancelConfirm"
            >
              <span
                class="text-sm font-semibold leading-none text-left text-gray-700"
                >Abbrechen</span
              >
            </button>
            <button
              class="flex items-center justify-center flex-1 rounded h-7 focus:outline-none"
              :class="[success ? 'bg-green-300' : `bg-${color}-300`]"
              @click="confirm"
            >
              <div
                v-if="!success"
                class="flex items-center justify-center space-x-1"
              >
                <AppIcon :size="5" :icon="icon" :color="`${color}-600`" />
                <span
                  class="text-sm font-semibold leading-none text-left"
                  :class="`text-${color}-700`"
                  >Löschen</span
                >
              </div>
              <div v-else class="flex items-center justify-center">
                <AppIcon :size="5" icon="Check" color="green-600" />
              </div>
            </button>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <button
        type="button"
        class="flex items-center w-full py-2 space-x-2 focus:outline-none"
        @click="logout"
      >
        <div
          class="flex items-center justify-center space-x-1 rounded w-7 h-7"
          :class="`bg-${color}-300`"
        >
          <AppIcon :size="5" :icon="icon" :color="`${color}-600`" />
        </div>
        <span
          class="font-semibold leading-tight text-left"
          :class="`text-${color}-600`"
        >
          <slot />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray'
    },
    icon: {
      type: String,
      default: 'X'
    },
    item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      confirmPrompt: false,
      success: false
    }
  },
  methods: {
    showConfirm() {
      this.confirmPrompt = true
    },
    cancelConfirm() {
      this.confirmPrompt = false
    },
    cancelAfterConfirm() {
      this.cancelConfirm()
      this.success = false
    },
    confirm() {
      if (this.item === 'bookmarks') {
        this.$store.dispatch('user/resetBookmarks')
      } else if (this.item === 'activities') {
        this.$store.dispatch('user/resetFinishedStories')
      }
      this.success = true
      setTimeout(this.cancelAfterConfirm, 1000)
    },
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/')
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}
</script>
