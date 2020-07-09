<template>
  <div id="recipes" class="container">
    <WcLoading v-if="$fetchState.pending" />
    <h1 class="Content__Title">
      {{ $t('recipes.title') }}
    </h1>
    <RecipeFilters v-if="false" />
    <div class="row">
      <h1 v-if="!areRecipes" class="col-12 text-muted">
        {{ $t('recipes.there_is_no_recipes_yet') }}
      </h1>
    </div>
    <div class="row">
      <div
        v-for="(recipe, recipesIndex) in recipes"
        :key="recipesIndex"
        class="col-lg-3 col-md-6 col-12 mb-3"
      >
        <RecipeCard
          :showCardHeader="userCanEdit(recipe.author)"
          :id="recipe._id"
          :title="recipe.title"
          :b-img-lazy-src="
            recipe.mainImg ? $store.state.apiRestBaseUrl + recipe.mainImg : null
          "
          :readMoreLink="`recipe/${recipe.slug}`"
          :description="recipe.description"
          :more-info="recipe.more_info"
          @recipeDeleted="getRecipes()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeFilters from '@/components/recipes/RecipeFilters.vue'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
import WcLoading from '@/components/WcLoading.vue'

export default {
  components: {
    RecipeFilters,
    RecipeCard,
    WcLoading
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
  async fetch() {
    try {
      this.recipes = await this.$axios.$get('recipes/')
    } catch (error) {
      throw error
    }
  },
  methods: {
    userCanEdit(recipeAuthor) {
      return recipeAuthor === this.$store?.state?.user?.userId
    },
    async getRecipes() {
      this.recipes = await this.$axios.$get('recipes/')
    }
  }
}
</script>
