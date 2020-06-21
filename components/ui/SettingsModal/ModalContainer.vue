<template>
  <transition name="fade">
    <div
      v-show="modalVisible"
      class="fixed inset-0 z-20 h-full px-4 pt-24 pb-40"
    >
      <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->

      <div class="fixed inset-0">
        <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
      <div
        class="h-full overflow-hidden transition-all transform bg-white rounded-lg shadow-xl"
      >
        <div class="relative h-full overflow-hidden">
          <div
            class="absolute inset-x-0 flex items-baseline justify-between p-3 px-4 bg-white h-14"
          >
            <span class="flex-1"></span>
            <h3 class="flex-1 text-lg font-semibold text-center">
              Einstellungen
            </h3>
            <div class="flex justify-end flex-1">
              <button
                type="button"
                class="focus:outline-none focus:opacity-75"
                @click="closeSettings"
              >
                Fertig
              </button>
            </div>
          </div>
          <div class="h-full px-4 pt-14">
            <div class="h-full pt-2 pb-8 space-y-2 overflow-y-auto">
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
              <SettingsItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SettingsItem from './SettingsItem'

export default {
  components: {
    SettingsItem
  },
  computed: {
    modalVisible() {
      return this.$store.state.modals.settings
    }
  },
  methods: {
    closeSettings() {
      this.$store.commit('modals/toggleModal')
    }
  }
}
</script>

<style></style>
