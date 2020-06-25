export const state = () => ({
  lastModal: null,
  modalVisible: false
})

export const mutations = {
  closeModal(state) {
    state.modalVisible = false
  },
  openModal(state, modalName) {
    state.lastModal = modalName
    state.modalVisible = true
  }
}
