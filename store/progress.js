import Vue from 'vue'

const getDefaultState = () => {
  return {
    finishedStories: {}
  }
}

export const state = () => getDefaultState()

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
  setFinishedStories(state, payload) {
    state.finishedStories = {
      ...state.finishedStories,
      ...payload
    }
  },
  addFinishedStory(state, { key, timestamp }) {
    Vue.set(state.finishedStories, key, timestamp)
  }
}

export const actions = {
  resetState({ commit }) {
    commit('resetState')
  },
  setFinishedStories({ commit, rootState }) {
    const user = rootState.auth.user
    const finishedStories = {}
    if (user) {
      this.$fireStore
        .collection('users')
        .doc(user)
        .collection('finishedStories')
        .get()
        .then((res) => {
          res.forEach((x) => {
            const id = x.id
            const data = x.data()
            finishedStories[id] = data
          })
          commit('setFinishedStories', finishedStories)
        })
    }
  },
  addFinishedStory({ commit, rootState }, key) {
    // commit('addFinishedStory', {
    //   key,
    //   timestamp: { nanoseconds: 0, seconds: date }
    // })
    const user = rootState.auth.user
    this.$fireStore
      .collection('users')
      .doc(user)
      .collection('finishedStories')
      .doc(key)
      .set({
        timestamp: this.$fireStoreObj.FieldValue.serverTimestamp()
      })
    // try {
    //   await this.$fireStore
    //     .collection('users')
    //     .doc(user.uid)
    //     .set({
    //       finishedStories
    //     })
    //   // commit('setUser', user.uid)
    // } catch (error) {
    //   throw new Error('Ein Fehler ist aufgetreten: ', error)
    // }
  }
}
