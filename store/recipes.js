export const state = () => ({
  recipes: [],
  totalRecipes: 0
})

export const mutations = {
  getRecipes(state, payload) {
    state.recipes = [...state.recipes, ...payload.recipes]
    state.totalRecipes = payload.totalRecipes
  },
  resetRecipes(state) {
    state.recipes = []
    state.totalRecipes = 0
  }
}
export const actions = {
  async getRecipesAction({ commit }, payload) {
    let url = 'recipes'
    if (payload) {
      Object.keys(payload).forEach((key, index) => {
        url += `${index === 0 ? '?' : '&'}${key}=${payload[key]}`
      })
    }
    const recipes = await this.$axios.$get(url)
    commit('getRecipes', recipes)
  }
}
