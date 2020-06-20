export const state = () => ({
  isUserLogged: false,
  jwt: '',
  userId: ''
})

export const mutations = {
  isUserLoggedMutation(state, payload) {
    state.isUserLogged = payload
  },
  jwtMutation(state, payload) {
    state.jwt = payload
  },
  userIdMutation(state, payload) {
    state.userId = payload
  }
}

export const actions = {
  async userLoginAction({ state, commit }, payload) {
    const longinData = payload
    let dataAfterLogin = {
      token: '',
      userId: ''
    }
    try {
      dataAfterLogin = await this.$axios.$post('/login', longinData)
      localStorage.setItem('token', state.jwt)
      commit('jwtMutation', dataAfterLogin.token)
      commit('userIdMutation', dataAfterLogin.userId)
      commit('isUserLoggedMutation', true)
    } catch (error) {
      this.isUserLoggedMutation(false)
      this.serverErrorsHandler(error)
    }
  }
}
