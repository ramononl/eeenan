export const state = () => ({
  topics: [],
  subtopics: [],
  lessons: [],
  stories: [],
  user: null
})

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
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async fetchTopics({ commit }) {
    const topics = []
    try {
      await this.$fireStore
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
    } catch (e) {
      return Promise.reject(e)
    }
  },
  fetchSubtopics({ commit }, { topic }) {
    const subtopics = []
    this.$fireStore
      .collection('topics')
      .doc(topic)
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
  },
  fetchLessons({ commit }, { topic, subtopic }) {
    const lessons = []
    this.$fireStore
      .collection('topics')
      .doc(topic)
      .collection('subtopics')
      .doc(subtopic)
      .collection('lessons')
      .orderBy('ordering')
      .get()
      .then((res) => {
        res.forEach((x) => {
          const id = x.id
          const data = x.data()
          lessons.push({ id, ...data })
        })
        commit('setLessons', lessons)
      })
  },
  fetchStories({ commit }, { topic, subtopic, lesson }) {
    const stories = []
    this.$fireStore
      .collection('topics')
      .doc(topic)
      .collection('subtopics')
      .doc(subtopic)
      .collection('lessons')
      .doc(lesson)
      .collection('stories')
      .orderBy('ordering')
      .get()
      .then((res) => {
        res.forEach((x) => {
          const id = x.id
          const data = x.data()
          stories.push({ id, ...data })
        })
        commit('setStories', stories)
      })
  },
  async createUser({ commit }, { firstName, lastName, email }) {
    try {
      await this.$fireStore
        .collection('users')
        .add({
          firstName,
          lastName,
          email
        })
        .then(() => {
          commit('setUser', { firstName, lastName, email })
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
