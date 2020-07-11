const getDefaultState = () => {
  return {
    topics: {},
    subtopics: {},
    lessons: {},
    stories: {},
    showInstallMessage: false
  }
}

export const state = () => getDefaultState()

export const mutations = {
  setTopics(state, payload) {
    state.topics = payload
  },
  setSubtopics(state, payload) {
    state.subtopics = payload
  },
  setLessons(state, payload) {
    state.lessons = payload
  },
  setStories(state, payload) {
    state.stories = payload
  },
  showInstallMessage(state, payload) {
    state.showInstallMessage = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export const actions = {
  resetState({ commit }) {
    commit('resetState')
  },
  fetchTopics({ commit }) {
    const topics = {}
    this.$fireStore
      .collection('topics')
      .get()
      .then((res) => {
        res.forEach((x) => {
          const id = x.id
          const data = x.data()
          topics[id] = data
        })
        commit('setTopics', topics)
      })
  },
  fetchSubtopics({ commit }) {
    const subtopics = {}
    this.$fireStore
      .collection('subtopics')
      .get()
      .then((res) => {
        res.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          subtopics[id] = data
        })
        commit('setSubtopics', subtopics)
      })
  },
  fetchLessons({ commit }) {
    const lessons = {}
    this.$fireStore
      .collection('lessons')
      .get()
      .then((res) => {
        res.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          lessons[id] = data
        })
        commit('setLessons', lessons)
      })
  },
  fetchStories({ commit }) {
    const stories = {}
    this.$fireStore
      .collection('stories')
      .get()
      .then((res) => {
        res.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          stories[id] = data
        })
        commit('setStories', stories)
      })
  }
}
