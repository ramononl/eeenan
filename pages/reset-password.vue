<template>
  <div class="flex h-full px-4 py-12 overflow-y-auto">
    <div class="w-full max-w-md m-auto">
      <div>
        <LogoColor class="w-40 h-40 max-w-full mx-auto" />
        <h2
          class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
        >
          Passwort zurücksetzen
        </h2>
        <p class="mt-2 text-sm leading-5 text-center text-gray-600">
          Nach der Eingabe deiner E-Mail-Adresse erhältst du eine E-Mail, damit
          du dein Passwort erneuern kannst.
        </p>
      </div>
      <form class="mt-8 mb-4" @submit.prevent="resetPassword">
        <div class="rounded-md shadow-sm">
          <div>
            <input
              v-model="form.email"
              aria-label="E-Mail-Ad­res­se"
              name="email"
              type="email"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="E-Mail-Ad­res­se"
            />
          </div>
        </div>

        <FormMessage :message="message" />

        <div class="mt-6">
          <LoginRegisterButton :loading="loading" text="Senden" />
        </div>
        <div class="flex items-center justify-center mt-6">
          <div class="text-sm leading-5">
            <nuxt-link
              to="login"
              class="flex items-center font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
            >
              <AppIcon :size="5" icon="ChevronLeft" />
              <span>Zurück zum Login</span>
            </nuxt-link>
          </div>
        </div>
      </form>
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
        email: null
      }
    }
  },
  computed: {
    message() {
      if (this.$store.state.auth.message) {
        const message = this.$store.state.auth.message
        if (message === 'auth/user-not-found') {
          return {
            text:
              'Es wurde kein User mit der angegebenen E-Mail Adresse gefunden.',
            success: false
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
  methods: {
    async resetPassword() {
      try {
        this.loading = true
        await this.$store.dispatch('auth/resetPassword', this.form)
        this.$router.push('/login')
      } catch (error) {
        this.loading = false
        console.error(error.message)
      }
    }
  }
}
</script>

<style></style>
