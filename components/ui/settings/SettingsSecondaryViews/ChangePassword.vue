<template>
  <div>
    <h3 class="font-semibold">Passwort ändern</h3>
    <p class="text-sm text-gray-700">
      Bestätige zur Änderung deines Passwortes dein aktuelles Passwort
    </p>
    <form class="mt-4 mb-4" @submit.prevent="changePassword">
      <div class="rounded-lg shadow-sm">
        <div>
          <input
            v-model="email"
            aria-label="Aktuelle E-Mail-Ad­res­se"
            name="email"
            type="email"
            required
            disabled
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-t-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Aktuelle E-Mail-Ad­res­se"
          />
        </div>
        <div class="-mt-px">
          <input
            v-model="form.currentPassword"
            aria-label="Aktuelles Passwort"
            name="password"
            type="password"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Aktuelles Passwort"
          />
        </div>
        <div class="-mt-px">
          <input
            v-model="form.newPassword"
            aria-label="Neues Passwort"
            name="password"
            type="password"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-b-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Neues Passwort"
          />
        </div>
      </div>

      <FormMessage :message="message" />

      <div class="mt-6">
        <SubmitButton :loading="loading" text="Passwort ändern" />
      </div>
    </form>
  </div>
</template>

<script>
import SubmitButton from '~/components/common/SubmitButton'
import FormMessage from '~/components/common/FormMessage'

export default {
  components: { SubmitButton, FormMessage },
  data() {
    return {
      loading: false,
      form: {
        currentPassword: null,
        newPassword: null
      }
    }
  },
  computed: {
    email() {
      return this.$store.state.user.email
    },
    message() {
      if (this.$store.state.user.message) {
        const message = this.$store.state.user.message
        if (message === 'password-changed') {
          return {
            text: 'Dein Passwort wurde erfolgreich geändert.',
            success: true
          }
        } else if (message === 'auth/wrong-password') {
          return {
            text:
              'Das eingegebene Passwort ist nicht korrekt. Versuche es nochmals.',
            success: false
          }
        } else if (message === 'auth/weak-password') {
          return {
            text:
              'Dein neues Passwort ist zu schwach. Verwende mindestens 6 Zeichen.',
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
    async changePassword() {
      try {
        this.loading = true
        await this.$store.dispatch('user/changePassword', {
          email: this.email,
          currentPassword: this.form.currentPassword,
          newPassword: this.form.newPassword
        })
        this.form = {
          currentPassword: null,
          newPassword: null
        }
        this.loading = false
      } catch (error) {
        this.form = {
          currentPassword: null,
          newPassword: null
        }
        this.loading = false
        console.error(error.message)
      }
    }
  }
}
</script>

<style></style>
