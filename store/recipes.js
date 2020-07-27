export const state = () => ({
  recipes: []
})

export const mutations = {
  getRecipes(state, payload) {
    state.recipes = [...state.recipes, ...payload]
  },
  resetRecipes(state) {
    state.recipes = []
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
