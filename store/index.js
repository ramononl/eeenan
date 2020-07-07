import Vue from 'vue'

export const state = () => ({
  topics: {},
  subtopics: {},
  lessons: {},
  stories: [],
  user: null,
  isAuthenticated: false
})

export const mutations = {
  setTopics(state, payload) {
    Vue.set(state, 'topics', payload)
  },
  setSubtopics(state, { topic, subtopics }) {
    Vue.set(state.subtopics, topic, subtopics)
  },
  setLessons(state, { topic, subtopic, lessons }) {
    Vue.set(state.lessons, topic, {})
    Vue.set(state.lessons[topic], subtopic, lessons)
  },
  setStories(state, payload) {
    state.stories = payload
  },
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  fetchTopics({ commit }) {
    const topics = {}
    this.$fireStore
      .collection('topics')
      .orderBy('ordering')
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
        commit('setSubtopics', { topic, subtopics })
      })
  },
  fetchLessons({ commit }, { topic, subtopic }) {
    const lessons = {}
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
          lessons[id] = data
        })
        commit('setLessons', { topic, subtopic, lessons })
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
  registerUser({ commit }, { firstName, lastName, email, password }) {
    this.$fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.$fireStore
          .collection('users')
          .doc(data.user.uid)
          .set({
            firstName,
            lastName,
            email
          })
          .then(() => {
            commit('setUser', { firstName, lastName, email })
            this.$router.push('/')
          })
      })
  },
  loginUser({ commit }, { email, password }) {
    this.$fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      commit('setUser', email)
      this.$router.push('/')
    })
  },
  logoutUser() {}
}
