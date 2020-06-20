export const state = () => ({
  isUserLogged: false
})

export const mutations = {
  isUserLoggedMutation(state, payload) {
    state.isUserLogged = payload
  }
}
