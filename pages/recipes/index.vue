<template>
  <div id="recipes">
    <b-card
      v-for="(recipe, index) in recipes"
      :key="index"
      :title="recipe.title"
      :img-src="recipe.thumbnailImg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{ recipe.description }}
      </b-card-text>

      <b-button href="#" variant="primary">{{
        $t('recipes.buy_ingredients')
      }}</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const recipes = await context.app.$axios.$get('recipes/')
    return {
      recipes
    }
  }
}
</script>

<style></style>
