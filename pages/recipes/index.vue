<template>
  <div id="recipes" class="container">
    <RecipeFilters v-if="areRecipes" />
    <div class="row">
      <h1 v-if="!areRecipes" class="col-12 text-muted">
        {{ $t('recipes.there_is_no_recipes_yet') }}
      </h1>
    </div>
    <div class="row">
      <div
        v-for="(recipe, recipesIndex) in recipes"
        :key="recipesIndex"
        class="mb-5 col-12 col-md-6 col-lg-3 d-flex align-items-stretch"
      >
        <RecipeCard
          :showCardHeader="true"
          :id="recipe._id"
          :title="recipe.title"
          :b-img-lazy-src="
            recipe.mainImg ? $store.state.apiRestBaseUrl + recipe.mainImg : null
          "
          :description="recipe.description"
          :more-info="recipe.more_info"
          :directions="recipe.directions"
          @recipeDeleted="getRecipes()"
        />
      </div>
    </div>
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
  data() {
    return {
      recipes: []
    }
  },
  computed: {
    areRecipes() {
      return this.recipes.length > 0
    }
  },
  async asyncData({ app, route, error }) {
    try {
      const recipes = await app.$getRecipes()
      return {
        recipes
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  methods: {
    async getRecipes() {
      this.recipes = await this.$getRecipes()
    }
  }
}
</script>
