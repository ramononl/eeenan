export const state = () => ({
  settings: false
})

export const mutations = {
  toggleModal(state) {
    state.settings = !state.settings
  }
}
