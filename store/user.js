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
  },
  signOutMutation(state) {
    state.isUserLogged = false
    localStorage.removeItem('token')
  }
}

export const actions = {
  async userLoginAction({ state, commit }, payload) {
    const longinData = payload
    let dataAfterUserLoged = {
      token: '',
      userId: ''
    }
    try {
      dataAfterUserLoged = await this.$axios.$post('/login', longinData)
      commit('jwtMutation', dataAfterUserLoged.token)
      commit('userIdMutation', dataAfterUserLoged.userId)
      commit('isUserLoggedMutation', true)
      localStorage.setItem('token', state.jwt)
    } catch (error) {
      commit('isUserLoggedMutation', false)
      throw error
    }
  },
  getUserData({ commit }) {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      const jwtPayload = JSON.parse(atob(jwt.split('.')[1]))
      commit('userIdMutation', jwtPayload.userId)
      commit('isUserLoggedMutation', true)
    } else {
      commit('isUserLoggedMutation', false)
    }
  }
}
