export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async logout({ commit, dispatch }) {
    await this.$fireAuth.signOut()
    await dispatch('resetState', null, { root: true })
    await dispatch('modals/resetState', null, { root: true })
    commit('setUser', null)
  },
  async register({ commit }, { firstName, lastName, email, password }) {
    try {
      await this.$fireAuth.createUserWithEmailAndPassword(email, password)
      const user = this.$fireAuth.currentUser
      await this.$fireStore
        .collection('users')
        .doc(user.uid)
        .set({
          firstName,
          lastName,
          email
        })
      await user.sendEmailVerification()
      commit('setUser', user.uid)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('User mit E-Mail bereits registriert')
      } else {
        throw new Error('Ein Fehler ist aufgetreten: ', error)
      }
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        email,
        password
      )
      commit('setUser', user.user.uid)
    } catch (error) {
      throw new Error('Ein Fehler ist aufgetreten: ', error)
    }
  }
}

// registerUser({ commit }, { firstName, lastName, email, password }) {
//   this.$fireAuth
//     .createUserWithEmailAndPassword(email, password)
//     .then((data) => {
//       this.$fireStore
//         .collection('users')
//         .doc(data.user.uid)
//         .set({
//           firstName,
//           lastName,
//           email
//         })
//         .then(() => {
//           commit('setUser', { firstName, lastName, email })
//           this.$router.push('/')
//         })
//     })
// },
// loginUser({ commit }, { email, password }) {
//   this.$fireAuth.signInWithEmailAndPassword(email, password).then(() => {
//     commit('setUser', email)
//     this.$router.push('/')
//   })
// },
// logoutUser() {}
