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
          class="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl"
          :class="[modalName === 'SettingsModal' ? 'h-full' : '']"
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
                class="max-h-full px-4 overflow-y-auto"
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
import ModalTitle from './ModalTitle'
import SearchModal from '~/components/ui/SearchModal'
import SettingsModal from '~/components/ui/SettingsModal'

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

<style></style>
