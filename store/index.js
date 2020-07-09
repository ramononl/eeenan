import Vue from 'vue'

const getDefaultState = () => {
  return {
    topics: {},
    subtopics: {},
    lessons: {},
    stories: []
  }
}

export const state = () => getDefaultState()

export const mutations = {
  setTopics(state, payload) {
    Vue.set(state, 'topics', payload)
  },
  setSubtopics(state, { topic, subtopics }) {
    Vue.set(state.subtopics, topic, subtopics)
  },
  setLessons(state, { topic, subtopic, lessons }) {
    state.lessons = {
      ...state.lessons,
      [topic]: { ...state.lessons[topic], [subtopic]: lessons }
    }
  },
  setStories(state, payload) {
    state.stories = payload
  },
  removeStories(state) {
    state.stories = []
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
    const subtopics = {}
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
          subtopics[id] = data
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
  }
}
