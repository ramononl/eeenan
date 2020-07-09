<template>
  <div class="flex h-full px-4 py-12 overflow-y-auto">
    <div class="w-full max-w-md m-auto">
      <div>
        <!-- <img
            class="w-auto h-12 mx-auto"
            src="/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          /> -->
        <svg
          class="w-10 h-10 mx-auto text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="8" />
        </svg>
        <h2
          class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
        >
          Anmeldung mit deinem Account
        </h2>
        <p class="mt-2 text-sm leading-5 text-center text-gray-600">
          Noch kein Account? Jetzt
          <nuxt-link
            to="register"
            class="font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
            >Registrieren</nuxt-link
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

        <div v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <div class="mt-6">
          <LoginRegisterButton :loading="loading" text="Anmelden" />
        </div>
        <div class="flex items-center justify-center mt-6">
          <div class="text-sm leading-5">
            <nuxt-link
              to="/"
              class="font-medium text-orange-600 transition duration-150 ease-in-out hover:text-orange-500 focus:outline-none focus:underline"
              >Passwort vergessen?</nuxt-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoginRegisterButton from '~/components/common/LoginRegisterButton'

export default {
  components: {
    LoginRegisterButton
  },
  layout: 'fullscreen',
  data() {
    return {
      loading: false,
      errorMessage: null,
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        // auth/wrong-password
        // console.log(error.code)
        console.error(error.message)
        console.error(error)
      }
    }
  }
}
</script>

<style></style>
