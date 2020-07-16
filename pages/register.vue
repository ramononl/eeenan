<template>
  <div class="flex h-full px-4 py-12 overflow-y-auto">
    <div class="w-full max-w-md m-auto">
      <div>
        <LogoColor class="w-32 h-32 max-w-full mx-auto" />
        <h2
          class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
        >
          Registrieren
        </h2>
        <p
          class="flex flex-wrap items-center justify-center mt-2 space-x-1 text-sm leading-5 text-center text-gray-600"
        >
          <span class="flex-none">Du hast bereits ein Konto?</span>
          <nuxt-link
            to="/"
            class="flex-none font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
            >Jetzt Anmelden</nuxt-link
          >
        </p>
      </div>
      <form class="mt-8 mb-4" @submit.prevent="register">
        <div class="rounded-lg shadow-sm">
          <div>
            <input
              v-model="form.firstName"
              aria-label="Vorname"
              name="firstName"
              type="text"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-t-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Vorname"
            />
          </div>
          <div class="-mt-px">
            <input
              v-model="form.lastName"
              aria-label="Nachname"
              name="lastName"
              type="text"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Nachname"
            />
          </div>
          <div class="-mt-px">
            <select
              v-model="form.immClass"
              aria-label="Klasse"
              name="immClass"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5 form-select"
            >
              <option value="" disabled>Klasse</option>
              <option
                v-for="(immClass, key) in immClasses"
                :key="key"
                :value="key"
                >{{ immClass.name }}</option
              >
            </select>
          </div>
          <div class="-mt-px">
            <input
              v-model="form.email"
              aria-label="E-Mail-Adresse"
              name="email"
              type="email"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="E-Mail-Adresse"
            />
          </div>
          <div class="-mt-px">
            <input
              v-model="form.password"
              aria-label="Passwort"
              name="password"
              type="password"
              required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-b-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Passwort"
            />
          </div>
        </div>

        <FormMessage :message="message" />

        <div class="mt-6">
          <SubmitButton :loading="loading" text="Registrieren" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LogoColor from '~/components/common/svg/LogoColor'
import FormMessage from '~/components/common/FormMessage'
import SubmitButton from '~/components/common/SubmitButton'

export default {
  components: {
    LogoColor,
    FormMessage,
    SubmitButton
  },
  layout: 'fullscreen',
  data() {
    return {
      loading: false,
      form: {
        firstName: null,
        lastName: null,
        immClass: '',
        email: null,
        password: null
      }
    }
  },
  computed: {
    message() {
      if (this.$store.state.auth.message) {
        const message = this.$store.state.auth.message
        if (message === 'auth/invalid-email') {
          return {
            text:
              'Die angegebene E-Mail-Adresse ist ungültig. Versuche es nochmals.',
            success: false
          }
        } else if (message === 'auth/weak-password') {
          return {
            text:
              'Das angegebene Passwort ist zu schwach. Verwende mindestens 6 Zeichen.',
            success: false
          }
        } else if (message === 'auth/email-already-in-use') {
          return {
            text:
              'Die angegebene E-Mail-Adresse ist bereits mit einem Nutzerkonto verknnüpft.',
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
    },
    immClasses() {
      return this.$store.state.classes
    }
  },
  beforeDestroy() {
    this.$store.commit('auth/setMessage', null)
  },
  methods: {
    async register() {
      try {
        this.loading = true
        await this.$store.dispatch('auth/register', this.form)
        this.$router.push('/start')
      } catch (error) {
        this.loading = false
        console.error(error.message)
      }
    }
  }
}
</script>

<style></style>
