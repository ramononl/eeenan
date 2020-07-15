export const state = () => ({
  user: null,
  message: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setMessage(state, payload) {
    state.message = payload
  }
}

export const actions = {
  async logout({ commit, dispatch }) {
    await this.$fireAuth.signOut()
    await dispatch('modals/resetState', null, { root: true })
    await dispatch('user/resetState', null, { root: true })
    commit('setUser', null)
  },
  async register(
    { commit },
    { firstName, lastName, immClass, email, password }
  ) {
    try {
      await this.$fireAuth.createUserWithEmailAndPassword(email, password)
      const user = this.$fireAuth.currentUser
      await user.updateProfile({
        displayName: firstName
      })
      await this.$fireStore
        .collection('users')
        .doc(user.uid)
        .set({
          firstName,
          lastName,
          immClass,
          email,
          finishedStories: {},
          bookmarks: []
        })
      await user.sendEmailVerification()
      commit('setMessage', null)
      commit('setUser', user.uid)
    } catch (error) {
      commit('setMessage', error.code)
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        email,
        password
      )
      commit('setMessage', null)
      commit('setUser', user.user.uid)
    } catch (error) {
      commit('setMessage', error.code)
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  },
  async resetPassword({ commit }, { email }) {
    try {
      await this.$fireAuth.sendPasswordResetEmail(email)
      commit('setMessage', 'reset-done')
    } catch (error) {
      commit('setMessage', error.code)
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  }
}
