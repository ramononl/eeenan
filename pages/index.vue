<template>
  <div class="flex h-full px-4 py-12 overflow-y-auto">
    <div class="w-full max-w-md m-auto">
      <div>
        <LogoColor class="w-40 h-40 max-w-full mx-auto" />
        <h2
          class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
        >
          Anmeldung mit deinem Account
        </h2>
        <p
          class="flex flex-wrap items-center justify-center mt-2 space-x-1 text-sm leading-5 text-center text-gray-600"
        >
          <span class="flex-none">Du hast noch keinen Account?</span>
          <nuxt-link
            to="register"
            class="flex-none font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
            >Jetzt Registrieren</nuxt-link
          >
        </p>
      </div>
      <form class="mt-8 mb-4" @submit.prevent="login">
        <div class="rounded-md shadow-sm">
          <div>
            <input
              v-model="form.email"
              aria-label="E-Mail-Ad­res­se"
              name="email"
              type="email"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="E-Mail-Ad­res­se"
            />
          </div>
          <div class="-mt-px">
            <input
              v-model="form.password"
              aria-label="Passwort"
              name="password"
              type="password"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Passwort"
            />
          </div>
        </div>

        <FormMessage :message="message" />

        <div class="mt-6">
          <LoginRegisterButton :loading="loading" text="Anmelden" />
        </div>
        <div class="flex items-center justify-center mt-6">
          <div class="text-sm leading-5">
            <nuxt-link
              to="reset-password"
              class="font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
              >Passwort vergessen?</nuxt-link
            >
          </div>
        </div>
      </form>
    </div>
    <div v-if="showInstallMessage" class="fixed inset-x-0 bottom-0 p-4">
      <div class="p-3 bg-gray-600 rounded-md shadow-lg">
        <div class="flex items-center justify-between space-x-3">
          <div class="flex flex-shrink-0 p-2 bg-gray-800 rounded-md">
            <AppIcon :size="6" icon="Download" color="gray-300" />
          </div>
          <p class="text-sm font-medium leading-tight text-white">
            Installiere diese App, indem du sie zum Homescreen hinzufügst.
          </p>
          <div class="flex-shrink-0">
            <button
              type="button"
              class="flex p-2 -mr-1 focus:outline-none"
              @click="hideInstallMessage"
            >
              <AppIcon :size="6" icon="X" color="gray-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoColor from '~/components/common/svg/LogoColor'
import FormMessage from '~/components/common/FormMessage'
import LoginRegisterButton from '~/components/common/LoginRegisterButton'

export default {
  components: {
    LogoColor,
    FormMessage,
    LoginRegisterButton
  },
  layout: 'fullscreen',
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      }
    }
  },
  computed: {
    showInstallMessage() {
      return this.$store.state.showInstallMessage
    },
    message() {
      if (this.$store.state.auth.message) {
        const message = this.$store.state.auth.message
        if (message === 'auth/wrong-password') {
          return {
            text:
              'Deine Anmeldedaten sind nicht korrekt. Versuche es nochmals.',
            success: false
          }
        } else if (message === 'auth/user-not-found') {
          return {
            text:
              'Es wurde kein User mit der angegebenen E-Mail-Adresse gefunden. Versuche es nochmals.',
            success: false
          }
        } else if (message === 'reset-done') {
          return {
            text:
              'Eine E-Mail mit Link zum Zurücksetzen des Passworts wurde an dich versendet.',
            success: true
          }
        } else {
          return {
            text:
              'Es ist ein unbekannter Fehler aufgetreten. Bitte versuche es später erneut.',
            success: false
          }
        }
      } else {
        return null
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('auth/setMessage', null)
  },
  methods: {
    async login() {
      try {
        this.loading = true
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/start')
      } catch (error) {
        this.loading = false
        console.error(error.message)
      }
    },
    hideInstallMessage() {
      this.$store.commit('showInstallMessage', false)
    }
  }
}
</script>

<style></style>
