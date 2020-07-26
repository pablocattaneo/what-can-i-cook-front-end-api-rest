<template>
  <div id="wc-page-recipes" class="position-relative">
    <WcLoading v-if="$fetchState.pending" />
    <div v-else class="page-content">
      <div class="row">
        <div class="col-12">
          <b-button
            :to="localePath({ path: '/admin/recipes/' })"
            variant="primary"
            >{{ $t('recipes.add_recipe') }}</b-button
          >
        </div>
      </div>
      <h1 class="Content__Title">
        {{ $t('recipes.title') }}
      </h1>
      <RecipeFilters v-if="false" />
      <div class="row">
        <h1 v-if="!areRecipes" class="col-12 text-muted">
          {{ $t('recipes.search_returns_no_recipes') }}
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
              recipe.mainImg
                ? $store.state.apiRestBaseUrl + recipe.mainImg
                : null
            "
            :readMoreLink="`recipe/${recipe.slug}`"
            :description="recipe.description"
            @recipeDeleted="getRecipes()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeFilters from '@/components/recipes/RecipeFilters.vue'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
import WcLoading from '@/components/WcLoading.vue'

import { mapState } from 'vuex'

export default {
  components: {
    RecipeFilters,
    RecipeCard,
    WcLoading
  },
  computed: {
    ...mapState('recipes', ['recipes']),
    areRecipes() {
      return this.recipes.length > 0
    }
  },
  watch: {
    async '$route.query'() {
      await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
    }
  },
  async fetch() {
    await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
  },
  methods: {
    userCanEdit(recipeAuthor) {
      return recipeAuthor === this.$store?.state?.user?.userId
    },
    async getRecipes() {
      await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
    }
  }
}
</script>
