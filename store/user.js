export const state = () => ({
  isUserLogged: false
})

export const mutations = {
  isUserLoggedMutation(state) {
    state.isUserLogged = true
  }
}
