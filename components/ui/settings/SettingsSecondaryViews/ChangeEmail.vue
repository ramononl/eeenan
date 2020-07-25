<template>
  <div>
    <h3 class="font-semibold">E-Mail-Adresse ändern</h3>
    <p class="text-sm text-gray-700">
      Bestätige zur Änderung deiner E-Mail-Adresse dein Passwort
    </p>
    <form class="mt-4 mb-4" @submit.prevent="changeEmail">
      <div class="rounded-lg shadow-sm">
        <div>
          <input
            v-model="currentEmail"
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
            v-model="form.password"
            aria-label="Passwort"
            name="password"
            type="password"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Passwort"
          />
        </div>
        <div class="-mt-px">
          <input
            v-model="form.newEmail"
            aria-label="Neue E-Mail-Ad­res­se"
            name="email"
            type="email"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-b-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Neue E-Mail-Ad­res­se"
          />
        </div>
      </div>

      <FormMessage :message="message" />

      <div class="mt-6">
        <SubmitButton :loading="loading" text="E-Mail-Adresse ändern" />
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
        password: null,
        newEmail: null
      }
    }
  },
  computed: {
    currentEmail() {
      return this.$store.state.user.email
    },
    message() {
      if (this.$store.state.user.message) {
        const message = this.$store.state.user.message
        if (message === 'email-changed') {
          return {
            text: 'Deine E-Mail-Adresse wurde erfolgreich geändert.',
            success: true
          }
        } else if (message === 'auth/wrong-password') {
          return {
            text:
              'Das eingegebene Passwort ist nicht korrekt. Versuche es nochmals.',
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
    async changeEmail() {
      try {
        this.loading = true
        await this.$store.dispatch('user/changeEmail', {
          currentEmail: this.currentEmail,
          password: this.form.password,
          newEmail: this.form.newEmail
        })
        this.form = {
          password: null,
          newEmail: null
        }
        this.$store.dispatch('user/setEmail')
        this.loading = false
      } catch (error) {
        this.loading = false
        console.error(error.message)
      }
    }
  }
}
</script>

<style></style>
