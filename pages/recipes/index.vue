<template>
  <div id="recipes">
    <RecipeFilters />
    <h1 v-if="recipes.length === 0" class="text-muted">
      {{ $t('recipes.there_is_no_recipes_yet') }}
    </h1>
    <RecipeCard
      v-for="(recipe, recipesIndex) in recipes"
      :key="recipesIndex"
      :id="recipe._id"
      :title="recipe.title"
      :b-img-lazy-src="
        recipe.mainImg ? $store.state.apiRestBaseUrl + recipe.mainImg : null
      "
      :description="recipe.description"
      :more-info="recipe.more_info"
      :directions="recipe.directions"
      @recipeDeleted="getRecipes()"
      style="max-width: 20rem;"
      class="mb-2"
    />
  </div>
</template>

<script>
import RecipeFilters from '@/components/recipes/RecipeFilters.vue'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
export default {
  components: {
    RecipeFilters,
    RecipeCard
  },
  async asyncData({ app, route }) {
    const recipes = await app.$getRecipes()
    return {
      recipes
    }
  },
  methods: {
    async getRecipes() {
      this.recipes = await this.$getRecipes()
    }
  }
}
</script>
