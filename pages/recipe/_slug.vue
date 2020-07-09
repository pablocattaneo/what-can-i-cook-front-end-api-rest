<template>
  <div id="recipe-page" class="container">
    <h1>{{ recipe.title }}</h1>
    <img
      v-if="recipe.mainImg"
      :src="$store.state.apiRestBaseUrl + recipe.mainImg"
      :alt="recipe.title"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ app, route }) {
    const recipe = await app.$axios.$get(`/recipe-by-slug/${route.params.slug}`)
    return {
      recipe
    }
  }
}
</script>
