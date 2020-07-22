export const state = () => ({
  recipes: []
})

export const mutations = {
  getRecipes(state, payload) {
    state.recipes = payload
  }
}
export const actions = {
  async getRecipeAction({ commit }, payload) {
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
