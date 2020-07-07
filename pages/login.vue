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

        <div class="mt-6">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-500 border border-transparent rounded-md group hover:bg-orange-400 focus:outline-none focus:border-orange-500 focus:shadow-outline-orange active:bg-orange-500"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-orange-400 transition duration-150 ease-in-out group-hover:text-orange-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Anmelden
          </button>
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
export default {
  layout: 'fullscreen',
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('loginUser', this.form)
    }
  }
}
</script>

<style></style>
