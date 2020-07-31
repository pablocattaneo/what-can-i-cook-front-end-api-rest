<template>
  <div id="wc-page-recipes" class="position-relative">
    <WcLoading v-if="$fetchState.pending" />
    <div v-else class="page-content">
      <div>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
        <b-sidebar id="sidebar-1" title="Sidebar" shadow>
          <RecipeFilters />
          <div class="px-3 py-2">
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <b-img
              src="https://picsum.photos/500/500/?image=54"
              fluid
              thumbnail
            ></b-img>
          </div>
        </b-sidebar>
      </div>
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
      <div class="row">
        <h1 v-if="isNotSearchResult" class="col-12 text-muted">
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
      <client-only>
        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <b-spinner variant="primary" />
          </template>
          <div slot="no-more"></div>
          <template slot="no-results">no-results</template>
        </infinite-loading>
      </client-only>
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
  data() {
    return {
      isNotSearchResult: false
    }
  },
  computed: {
    ...mapState('recipes', ['recipes', 'totalRecipes']),
    areRecipes() {
      return this.recipes.length > 0
    }
  },
  watch: {
    async '$route.query'() {
      this.$store.commit('recipes/resetRecipes')
      await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
      this.isNotSearchResult = this.recipes.length === 0
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
    },
    async infiniteHandler($state) {
      try {
        const queries = { ...this.$route.query, pagination: 10 }
        await this.$store.dispatch('recipes/getRecipesAction', queries)
        $state.loaded()
        if (this.recipes.length === this.totalRecipes) {
          $state.complete()
        }
      } catch (error) {
        $state.error()
        throw error
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('recipes/resetRecipes')
    next()
  }
}
</script>
