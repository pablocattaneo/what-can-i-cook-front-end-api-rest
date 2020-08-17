<template>
  <div id="wc-page-recipes" class="position-relative">
    <WcLoading v-if="isPageLoading" />
    <div v-else class="page-content">
      <div>
        <b-button v-b-toggle.sidebar-1>{{ $t('Filters') }}</b-button>
        <b-sidebar
          id="sidebar-1"
          :title="$t('Filters')"
          no-close-on-route-change
          shadow
        >
          <RecipeFilters
            :languages="languages"
            @languages-change="buildLanguageQueryString($event)"
            :category-selected="$route.query.category || null"
            :portion-calories="Number($route.query.calories) || 1000"
            class="px-3 py-2"
          />
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
      urlArray: [],
      languages: [
        {
          isActive: true,
          text: 'es',
          isDisable: false
        },
        {
          isActive: true,
          text: 'en',
          isDisable: false
        }
      ],
      isNotSearchResult: false,
      isPageLoading: false
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
      try {
        this.isPageLoading = true
        this.$store.commit('recipes/resetRecipes')
        await this.$store.dispatch(
          'recipes/getRecipesAction',
          this.$route.query
        )
        this.isNotSearchResult = this.recipes.length === 0
      } finally {
        this.isPageLoading = false
      }
    }
  },
  async fetch() {
    try {
      this.isPageLoading = true
      await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
    } finally {
      this.isPageLoading = false
    }
  },
  created() {
    this.setLanguagesFromQueryString()
  },
  methods: {
    setLanguagesFromQueryString() {
      const languagesQueryString = this.$route.query?.filters?.length
        ? JSON.parse(this.$route.query.filters).map((e) => e.language)
        : []
      languagesQueryString.forEach((languageInQuerystring) => {
        this.languages.forEach((language, index) => {
          this.languages[index].isActive =
            language.text === languageInQuerystring
        })
      })
    },
    buildLanguageQueryString(languages) {
      this.urlArray = []
      languages.forEach((language) => {
        if (language.isActive) {
          this.urlArray.push({ language: language.text })
        }
      })
      this.$router.push({
        path: this.localePath('/recipes'),
        query: {
          ...this.$route.query,
          filters: JSON.stringify(this.urlArray.length ? this.urlArray : [{}])
        }
      })
    },
    userCanEdit(recipeAuthor) {
      return recipeAuthor === this.$store?.state?.user?.userId
    },
    async getRecipes() {
      try {
        this.isPageLoading = true
        this.$store.commit('recipes/resetRecipes')
        await this.$store.dispatch(
          'recipes/getRecipesAction',
          this.$route.query
        )
      } finally {
        this.isPageLoading = false
      }
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
