<template>
  <div class="px-4">
    <transition name="slide-out">
      <div
        v-show="!secondaryView"
        class="h-full pt-2 pb-8 overflow-y-auto transition-all transform"
      >
        <div>
          <SettingsItem
            icon="User"
            @click.native="goToSecondary('change-personal')"
          >
            Persönliche Daten ändern
          </SettingsItem>
          <SettingsItem
            icon="AtSymbol"
            @click.native="goToSecondary('change-email')"
          >
            E-Mail-Adresse ändern
          </SettingsItem>
          <SettingsItem
            icon="Key"
            @click.native="goToSecondary('change-password')"
          >
            Passwort ändern
          </SettingsItem>
        </div>
        <div class="px-4 py-2 mt-4 space-y-1 bg-gray-100 border rounded-md">
          <SettingsAction color="red" icon="Trash" item="bookmarks">
            Merkliste löschen
          </SettingsAction>
          <SettingsAction color="red" icon="Trash" item="activities">
            Aktivitäten löschen
          </SettingsAction>
          <SettingsAction color="gray" icon="Logout">
            Abmelden
          </SettingsAction>
        </div>
        <div class="flex items-center justify-center mt-6 space-x-1">
          <AppIcon :size="8" icon="Logo" color="gray-400" />
          <span class="text-xl font-black text-gray-400">eeenan</span>
        </div>
      </div>
    </transition>
    <transition name="slide-in">
      <div
        v-show="secondaryView"
        class="absolute inset-x-0 bottom-0 transition-all transform top-14"
      >
        <div class="h-full px-4 pt-4 pb-8 overflow-y-auto">
          <ChangePersonal v-show="secondary === 'change-personal'" />
          <ChangeEmail v-show="secondary === 'change-email'" />
          <ChangePassword v-show="secondary === 'change-password'" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SettingsItem from '~/components/ui/settings/SettingsItem'
import SettingsAction from '~/components/ui/settings/SettingsAction'
import ChangePersonal from '~/components/ui/settings/SettingsSecondaryViews/ChangePersonal'
import ChangeEmail from '~/components/ui/settings/SettingsSecondaryViews/ChangeEmail'
import ChangePassword from '~/components/ui/settings/SettingsSecondaryViews/ChangePassword'

export default {
  components: {
    SettingsItem,
    SettingsAction,
    ChangePersonal,
    ChangeEmail,
    ChangePassword
  },
  props: {
    secondaryView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: 'Einstellungen',
      secondary: ''
    }
  },
  mounted() {
    this.$emit('get-title', this.title)
  },
  methods: {
    goToSecondary(secondary) {
      this.secondary = secondary
      this.$emit('secondary-view', true)
    }
  }
}
</script>

<style></style>
