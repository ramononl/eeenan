import Vue from 'vue'

const getDefaultState = () => {
  return {
    finishedStories: {},
    bookmarks: [],
    immClass: null,
    firstName: null,
    lastName: null,
    email: null,
    message: null
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
  setClass(state, payload) {
    state.immClass = payload
  },
  setEmail(state, payload) {
    state.email = payload
  },
  setNames(state, { firstName, lastName }) {
    state.firstName = firstName
    state.lastName = lastName
  },
  setMessage(state, payload) {
    state.message = payload
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
  setClass({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        const immClass = doc.data().immClass
        commit('setClass', immClass)
      })
  },
  setNames({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        const firstName = doc.data().firstName
        const lastName = doc.data().lastName
        commit('setNames', { firstName, lastName })
      })
  },
  setEmail({ commit, rootState }) {
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        const email = doc.data().email
        commit('setEmail', email)
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
  },
  async changePersonal({ commit }, { firstName, lastName, immClass }) {
    try {
      commit('setMessage', null)
      const user = this.$fireAuth.currentUser
      await user.updateProfile({
        displayName: firstName
      })
      await this.$fireStore
        .collection('users')
        .doc(user.uid)
        .update({
          firstName,
          lastName,
          immClass
        })
      commit('setClass', immClass)
      commit('setNames', { firstName, lastName })
      commit('setMessage', 'personal-changed')
    } catch (error) {
      commit('setMessage', error.code)
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  },
  async changeEmail({ commit }, { currentEmail, password, newEmail }) {
    try {
      commit('setMessage', null)
      const user = this.$fireAuth.currentUser
      const credential = await this.$fireAuthObj.EmailAuthProvider.credential(
        currentEmail,
        password
      )
      await user
        .reauthenticateWithCredential(credential)
        .then(function() {
          user.updateEmail(newEmail)
          commit('setMessage', 'email-changed')
        })
        .catch(function(error) {
          commit('setMessage', error.code)
          throw new Error('Ein Fehler ist aufgetreten: ', error)
        })
      await this.$fireStore
        .collection('users')
        .doc(user.uid)
        .update({
          email: newEmail
        })
    } catch (error) {
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  },
  async changePassword({ commit }, { email, currentPassword, newPassword }) {
    try {
      commit('setMessage', null)
      const user = this.$fireAuth.currentUser
      const credential = await this.$fireAuthObj.EmailAuthProvider.credential(
        email,
        currentPassword
      )
      await user
        .reauthenticateWithCredential(credential)
        .then(function() {
          user
            .updatePassword(newPassword)
            .then(function() {
              commit('setMessage', 'password-changed')
            })
            .catch(function(error) {
              commit('setMessage', error.code)
              throw new Error('Ein Fehler ist aufgetreten: ', error)
            })
        })
        .catch(function(error) {
          commit('setMessage', error.code)
          throw new Error('Ein Fehler ist aufgetreten: ', error)
        })
    } catch (error) {
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  }
}
