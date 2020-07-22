export const state = () => ({
  recipes: []
})

export const mutations = {
  getRecipes(state, payload) {
    state.recipes = payload
  }
}
export const actions = {
  async getRecipeAction({ commit }) {
    const recipes = await this.$axios.$get('recipes/')
    commit('getRecipes', recipes)
  }
}
