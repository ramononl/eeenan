const getDefaultState = () => {
  return {
    lastModal: null,
    modalVisible: false
  }
}

export const state = () => getDefaultState()

export const mutations = {
  closeModal(state) {
    state.modalVisible = false
  },
  openModal(state, modalName) {
    state.lastModal = modalName
    state.modalVisible = true
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export const actions = {
  resetState({ commit }) {
    commit('resetState')
  }
}
