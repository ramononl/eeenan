import Vue from 'vue'

const getDefaultState = () => {
  return {
    finishedStories: {},
    bookmarks: []
  }
}

export const state = () => getDefaultState()

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
  setFinishedStories(state, payload) {
    state.finishedStories = payload
  },
  addFinishedStory(state, { key, payload }) {
    Vue.set(state.finishedStories, key, payload)
  },
  setBookmarks(state, payload) {
    state.bookmarks = payload
  },
  addBookmark(state, payload) {
    state.bookmarks.push(payload)
  },
  removeBookmark(state, payload) {
    state.bookmarks.splice(state.bookmarks.indexOf(payload), 1)
  }
}

export const actions = {
  resetState({ commit }) {
    commit('resetState')
  },
  resetFinishedStories({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .update({
        finishedStories: {}
      })
    commit('setFinishedStories', {})
  },
  setFinishedStories({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        const finishedStories = doc.data().finishedStories
        commit('setFinishedStories', finishedStories)
      })
  },
  addFinishedStory({ commit, rootState }, { key, payload }) {
    const user = rootState.auth.user
    const field = 'finishedStories.' + key
    this.$fireStore
      .collection('users')
      .doc(user)
      .update({
        [field]: {
          timestamp: this.$fireStoreObj.FieldValue.serverTimestamp()
        }
      })
    commit('addFinishedStory', { key, payload })
  },
  setBookmarks({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        const bookmarks = doc.data().bookmarks
        commit('setBookmarks', bookmarks)
      })
  },
  addBookmark({ commit, rootState }, key) {
    const user = rootState.auth.user
    if (!rootState.user.bookmarks.includes(key)) {
      this.$fireStore
        .collection('users')
        .doc(user)
        .update({
          bookmarks: this.$fireStoreObj.FieldValue.arrayUnion(key)
        })
      commit('addBookmark', key)
    }
  },
  removeBookmark({ commit, rootState }, key) {
    const user = rootState.auth.user
    if (rootState.user.bookmarks.includes(key)) {
      this.$fireStore
        .collection('users')
        .doc(user)
        .update({
          bookmarks: this.$fireStoreObj.FieldValue.arrayRemove(key)
        })
      commit('removeBookmark', key)
    }
  },
  resetBookmarks({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .update({
        bookmarks: []
      })
    commit('setBookmarks', [])
  }
}
