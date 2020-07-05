export const state = () => ({
  topics: [],
  subtopics: [],
  lessons: [],
  stories: []
})

export const mutations = {
  setTopics(state, payload) {
    state.topics = payload
  },
  setSubtopics(state, payload) {
    state.subtopics = payload
  }
}

export const actions = {
  fetchTopics({ commit }) {
    const topics = []
    this.$fireStore
      .collection('topics')
      .orderBy('ordering')
      .get()
      .then((res) => {
        res.forEach((x) => {
          const id = x.id
          const data = x.data()
          topics.push({ id, ...data })
        })
        commit('setTopics', topics)
      })
  },
  fetchSubtopics({ commit }, { subtopic }) {
    const subtopics = []
    this.$fireStore
      .collection('topics')
      .doc(subtopic)
      .collection('subtopics')
      .orderBy('ordering')
      .get()
      .then((res) => {
        res.forEach((x) => {
          const id = x.id
          const data = x.data()
          subtopics.push({ id, ...data })
        })
        commit('setSubtopics', subtopics)
      })
  }
}
