<template>
  <div>
    <h3 class="font-semibold">Persönliche Daten ändern</h3>
    <p class="text-sm text-gray-700">
      Hier kannst du deinen Namen und deine Klasse anpassen
    </p>
    <form class="mt-4 mb-4" @submit.prevent="changePersonal">
      <div class="rounded-lg shadow-sm">
        <div>
          <input
            v-model="firstName"
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
            v-model="lastName"
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
            v-model="immClass"
            aria-label="Klasse"
            name="immClass"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-b-lg appearance-none focus:outline-none focus:shadow-outline-orange focus:border-orange-300 focus:z-10 sm:text-sm sm:leading-5 form-select"
          >
            <option value="" disabled>Klasse</option>
            <option
              v-for="(immClassLoop, key) in immClasses"
              :key="key"
              :value="key"
              >{{ immClassLoop.name }}</option
            >
          </select>
        </div>
      </div>

      <FormMessage :message="message" />

      <div class="mt-6">
        <SubmitButton :loading="loading" text="Persönliche Daten ändern" />
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
        firstName: null,
        lastName: null,
        immClass: null
      }
    }
  },
  computed: {
    immClass: {
      get() {
        if (this.form.immClass === null) {
          return this.$store.state.user.immClass
        } else {
          return this.form.immClass
        }
      },
      set(newValue) {
        this.form.immClass = newValue
      }
    },
    firstName: {
      get() {
        if (this.form.firstName === null) {
          return this.$store.state.user.firstName
        } else {
          return this.form.firstName
        }
      },
      set(newValue) {
        this.form.firstName = newValue
      }
    },
    lastName: {
      get() {
        if (this.form.lastName === null) {
          return this.$store.state.user.lastName
        } else {
          return this.form.lastName
        }
      },
      set(newValue) {
        this.form.lastName = newValue
      }
    },
    immClasses() {
      return this.$store.state.classes
    },
    message() {
      if (this.$store.state.user.message) {
        const message = this.$store.state.user.message
        if (message === 'personal-changed') {
          return {
            text: 'Deine persönlichen Daten wurden erfolgreich angepasst.',
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
  methods: {
    async changePersonal() {
      const dataClean = {}
      Object.keys(this.form).forEach((formField) => {
        if (this.form[formField] === null) {
          dataClean[formField] = this.$store.state.user[formField]
        } else {
          dataClean[formField] = this.form[formField]
        }
      })
      try {
        this.loading = true
        await this.$store.dispatch('user/changePersonal', dataClean)
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
