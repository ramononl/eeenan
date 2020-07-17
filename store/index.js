import Vue from 'vue'

const getDefaultState = () => {
  return {
    topics: {},
    subtopics: {},
    lessons: {},
    stories: {},
    showInstallMessage: false,
    classes: {},
    searchObject: {}
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
  setClasses(state, payload) {
    state.classes = payload
  },
  setTodos(state, payload) {
    state.todos = payload
  },
  setSearchObject(state, { key, searchArray }) {
    Vue.set(state.searchObject, key, searchArray)
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
  fetchTopics({ commit, dispatch }) {
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
        dispatch('setSearchObject', 'topics')
      })
  },
  fetchSubtopics({ commit, dispatch }) {
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
        dispatch('setSearchObject', 'subtopics')
      })
  },
  fetchLessons({ commit, dispatch }) {
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
        dispatch('setSearchObject', 'lessons')
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
  },
  fetchClasses({ commit }) {
    const classes = {}
    this.$fireStore
      .collection('classes')
      .get()
      .then((res) => {
        res.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          classes[id] = data
        })
        commit('setClasses', classes)
      })
  },
  setSearchObject({ commit, rootState }, key) {
    const searchArray = []
    if (key === 'topics') {
      const topics = rootState.topics
      Object.keys(topics).forEach((topic) => {
        searchArray.push({
          type: 'topic',
          id: `/topics/${topic}`,
          title: topics[topic].title,
          titleLower: topics[topic].title.toLowerCase()
        })
      })
    } else if (key === 'subtopics') {
      const topics = rootState.topics
      const subtopics = rootState.subtopics
      Object.keys(subtopics).forEach((topic) => {
        Object.keys(subtopics[topic]).forEach((subtopic) => {
          searchArray.push({
            type: 'subtopic',
            id: `/topics/${topic}/${subtopic}`,
            topicTitle: topics[topic].title,
            title: subtopics[topic][subtopic].title,
            titleLower: subtopics[topic][subtopic].title.toLowerCase()
          })
        })
      })
    } else if (key === 'lessons') {
      const topics = rootState.topics
      const subtopics = rootState.subtopics
      const lessons = rootState.lessons
      Object.keys(lessons).forEach((topic) => {
        Object.keys(lessons[topic]).forEach((subtopic) => {
          Object.keys(lessons[topic][subtopic]).forEach((lesson) => {
            searchArray.push({
              type: 'lesson',
              id: `/topics/${topic}/${subtopic}/${lesson}`,
              topicTitle: topics[topic].title,
              subtopicTitle: subtopics[topic][subtopic].title,
              title: lessons[topic][subtopic][lesson].title,
              titleLower: lessons[topic][subtopic][lesson].title.toLowerCase()
            })
          })
        })
      })
    }
    commit('setSearchObject', { key, searchArray })
  }
}
