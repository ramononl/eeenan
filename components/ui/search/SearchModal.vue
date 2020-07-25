<template>
  <div class="divide-y">
    <input
      id="search"
      ref="search"
      v-model="searchField"
      name="search"
      type="search"
      autocomplete="off"
      class="block w-full px-4 py-3 text-base leading-6 appearance-none focus:outline-none"
      placeholder="Suchen..."
    />
    <div
      v-if="searchArrayFiltered.length > 0"
      class="overflow-y-auto bg-gray-100 divide-y divide-gray-200 max-h-72"
    >
      <div v-for="result in searchArrayFiltered" :key="result.id">
        <nuxt-link
          :to="result.id"
          class="block px-4 py-3"
          @click.native="goToItem"
        >
          <div class="flex flex-wrap items-baseline">
            <span class="mr-2 font-bold">{{ result.title }}</span>
            <span class="text-sm">{{ result.subtitle }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Schnellsuche',
      searchField: ''
    }
  },
  computed: {
    searchArray() {
      const searchObjectStore = this.$store.state.searchObject
      const searchArray = []
      if (Object.keys(searchObjectStore).length > 0) {
        Object.keys(searchObjectStore).forEach((type) => {
          Object.keys(searchObjectStore[type]).forEach((item) => {
            if (type === 'topics') {
              searchArray.push({
                id: searchObjectStore[type][item].id,
                title: searchObjectStore[type][item].title,
                titleLower: searchObjectStore[type][item].titleLower,
                subtitle: 'Hauptthema'
              })
            } else if (type === 'subtopics') {
              searchArray.push({
                id: searchObjectStore[type][item].id,
                title: searchObjectStore[type][item].title,
                titleLower: searchObjectStore[type][item].titleLower,
                subtitle: searchObjectStore[type][item].topicTitle
              })
            } else if (type === 'lessons') {
              searchArray.push({
                id: searchObjectStore[type][item].id,
                title: searchObjectStore[type][item].title,
                titleLower: searchObjectStore[type][item].titleLower,
                subtitle: `${searchObjectStore[type][item].topicTitle} / ${searchObjectStore[type][item].subtopicTitle}`
              })
            }
          })
        })
        return searchArray
      } else {
        return []
      }
    },
    searchArrayFiltered() {
      const term = this.searchField.toLowerCase()
      if (term) {
        const searchArrayFiltered = this.searchArray.filter((el) =>
          el.titleLower.includes(term)
        )
        return searchArrayFiltered
      } else {
        return []
      }
    }
  },
  mounted() {
    this.$emit('get-title', this.title)
    this.focusInput()
  },
  methods: {
    focusInput() {
      this.$refs.search.focus()
    },
    goToItem() {
      this.$store.commit('modals/closeModal')
    }
  }
}
</script>

<style scoped>
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
