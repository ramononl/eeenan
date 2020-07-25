<template>
  <transition name="delay">
    <div
      v-show="modalVisible"
      class="fixed inset-0 z-20 h-full px-4 pt-20 transition pb-28"
    >
      <transition name="fade">
        <div v-show="modalVisible" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      </transition>
      <transition name="fade-up">
        <div
          v-if="modalVisible"
          class="overflow-hidden transition-all transform bg-white border rounded-lg shadow-xl"
          :class="[modalName === 'SettingsModal' ? 'h-full' : 'max-h-full']"
        >
          <div class="relative h-full overflow-hidden">
            <ModalTitle
              :secondary-view="secondaryView"
              :modal-title="modalTitle"
              @secondary-view="secondaryView = $event"
            />
            <div class="relative h-full pt-14">
              <component
                :is="modalName"
                class="max-h-full overflow-y-auto"
                :secondary-view="secondaryView"
                @secondary-view="secondaryView = $event"
                @get-title="modalTitle = $event"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import ModalTitle from '~/components/common/modal/ModalTitle'
import SearchModal from '~/components/ui/search/SearchModal'
import SettingsModal from '~/components/ui/settings/SettingsModal'

export default {
  components: {
    ModalTitle,
    SearchModal,
    SettingsModal
  },
  data() {
    return {
      secondaryView: false,
      modalTitle: ''
    }
  },
  computed: {
    modalName() {
      return this.$store.state.modals.lastModal
    },
    modalVisible() {
      return this.$store.state.modals.modalVisible
    }
  }
}
</script>

<style lang="postcss">
.fade-enter-active {
  @apply duration-300 ease-out;
}

.fade-leave-active {
  @apply duration-200 ease-in;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

.fade-up-enter-active {
  @apply duration-300 ease-out;
}

.fade-up-leave-active {
  @apply duration-200 ease-in;
}

.fade-up-enter,
.fade-up-leave-to {
  @apply translate-y-4 opacity-0;
}

.slide-out-enter-active {
  @apply duration-300 ease-in-out;
}

.slide-out-leave-active {
  @apply duration-300 ease-in-out;
}

.slide-out-enter,
.slide-out-leave-to {
  @apply -translate-x-full opacity-0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  @apply duration-300 ease-in-out;
}

.slide-in-enter,
.slide-in-leave-to {
  @apply translate-x-full opacity-0;
}

.delay-leave-active {
  @apply duration-200 ease-in;
}
</style>
