<template>
  <div id="recipe-page" class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ recipe.title }}</h1>
      </div>
    </div>
    <div v-if="recipe.mainImg" class="row">
      <div class="col-12">
        <b-img
          :src="$store.state.apiRestBaseUrl + recipe.mainImg"
          :alt="recipe.title"
          fluid
          center
        />
      </div>
    </div>
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
