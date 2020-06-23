<template>
  <transition name="delay">
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
      <transition name="fade">
        <div v-show="modalVisible" class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      </transition>

      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
      <transition name="fade-up">
        <div
          v-show="modalVisible"
          class="h-full overflow-hidden transition-all transform bg-white rounded-lg shadow-xl"
        >
          <div class="relative h-full overflow-hidden">
            <div
              class="absolute inset-x-0 z-50 flex items-center justify-between p-3 px-4 bg-white border-b h-14"
            >
              <div v-show="detailsView" class="flex flex-1">
                <div class="flex items-center" @click="detailsView = false">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Zurück</span>
                </div>
              </div>
              <div v-show="!detailsView" class="flex-1"></div>
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
            <div class="relative h-full px-4 pt-14">
              <transition name="slide-out">
                <div
                  v-show="!detailsView"
                  class="h-full pt-2 pb-8 space-y-2 overflow-y-auto transition-all transform"
                >
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                  <SettingsItem @click.native="detailsView = true" />
                </div>
              </transition>
              <transition name="slide-in">
                <div
                  v-show="detailsView"
                  class="absolute inset-x-0 bottom-0 px-4 transition-all transform top-14"
                >
                  <div class="h-full pt-2 pb-8 space-y-2 overflow-y-auto">
                    <SettingsItem />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import SettingsItem from './SettingsItem'

export default {
  components: {
    SettingsItem
  },
  data() {
    return {
      detailsView: false
    }
  },
  computed: {
    modalVisible() {
      return this.$store.state.modals.settings
    }
  },
  methods: {
    closeSettings() {
      this.$store.commit('modals/toggleModal')
      this.detailsView = false
    }
  }
}
</script>

<style></style>
