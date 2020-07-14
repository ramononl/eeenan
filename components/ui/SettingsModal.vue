<template>
  <div>
    <transition name="slide-out">
      <div
        v-show="!secondaryView"
        class="h-full pt-2 pb-8 overflow-y-auto transition-all transform"
      >
        <div class="space-y-2">
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
        <p @click="logout">Abmelden</p>
        <p @click="resetBookmarks">Merkliste zurücksetzen</p>
        <p @click="resetFinishedStories">Aktivitäten zurücksetzen</p>
        <div class="flex items-center justify-center mt-8 space-x-1">
          <AppIcon :size="8" icon="Logo" color="gray-400" />
          <span class="text-xl font-black text-gray-400">eeenan</span>
        </div>
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
  mounted() {
    this.$emit('get-title', this.title)
  },
  methods: {
    goToSecondary() {
      this.$emit('secondary-view', true)
    },
    resetFinishedStories() {
      this.$store.dispatch('user/resetFinishedStories')
    },
    resetBookmarks() {
      this.$store.dispatch('user/resetBookmarks')
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

<style></style>
