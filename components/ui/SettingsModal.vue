<template>
  <div>
    <transition name="slide-out">
      <div
        v-show="!secondaryView"
        class="h-full pt-2 pb-8 space-y-2 overflow-y-auto transition-all transform"
      >
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
        <SettingsItem @click.native="goToSecondary" />
      </div>
    </transition>
    <transition name="slide-in">
      <div
        v-show="secondaryView"
        class="absolute inset-x-0 bottom-0 px-4 transition-all transform top-14"
      >
        <div class="h-full pt-2 pb-8 space-y-2 overflow-y-auto">
          <SettingsItem />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SettingsItem from '~/components/common/SettingsItem'

export default {
  components: {
    SettingsItem
  },
  props: {
    secondaryView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: 'Einstellungen'
    }
  },
  created() {
    this.$emit('get-title', this.title)
  },
  methods: {
    goToSecondary() {
      this.$emit('secondary-view', true)
    }
  }
}
</script>

<style></style>
