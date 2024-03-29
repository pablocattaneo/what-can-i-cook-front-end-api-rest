<template>
  <div id="wc-page-recipes" class="position-relative">
    <WcLoading v-if="isPageLoading" />
    <div v-else class="page-content">
      <h1 class="Content__Title text-center">
        {{ $t('recipes.title') }}
      </h1>
      <div>
        <b-sidebar
          id="sidebar-1"
          :title="$t('Filters')"
          no-close-on-route-change
          shadow
        >
          <RecipeFilters
            :languages="languages"
            :category-selected="$route.query.category || null"
            :portion-calories="Number($route.query.calories) || 1000"
            :category-options="categoryOptions"
            class="px-3 py-2"
            @languages-change="buildLanguageQueryString($event)"
            @clear-filter="clearFilters"
          />
        </b-sidebar>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-between">
          <b-button v-b-toggle.sidebar-1>
            <BIconSliders class="mr-1" />
            {{ $t('Filters') }}
          </b-button>
          <b-button
            :to="localePath({ path: '/admin/recipes/' })"
            variant="primary"
          >
            <BIconPlusCircleFill class="mr-2" />
            {{ $t('recipes.add_recipe') }}
          </b-button>
        </div>
      </div>
      <div class="row mt-4">
        <h1 v-if="isNotSearchResult" class="col-12 text-muted">
          {{ $t('recipes.search_returns_no_recipes') }}
        </h1>
        <div
          v-for="(recipe, recipesIndex) in recipes"
          :key="recipesIndex"
          class="col-lg-3 col-md-6 col-12 mb-4"
        >
          <RecipeCard
            :id="recipe._id"
            :show-card-header="userCanEdit(recipe.author)"
            :title="recipe.title"
            :b-img-lazy-src="
              recipe.mainImg
                ? $store.state.apiRestBaseUrl + recipe.mainImg
                : null
            "
            :read-more-link="`recipe/${recipe.slug}`"
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
          <div slot="no-more" />
          <template slot="no-results">
            no-results
          </template>
        </infinite-loading>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BIconPlusCircleFill, BIconSliders } from 'bootstrap-vue'
import RecipeFilters from '@/components/recipes/RecipeFilters.vue'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
import WcLoading from '@/components/WcLoading.vue'

export default {
  components: {
    RecipeFilters,
    RecipeCard,
    WcLoading,
    BIconPlusCircleFill,
    BIconSliders
  },
  beforeRouteLeave (_, __, next) {
    this.$store.commit('recipes/resetRecipes')
    next()
  },
  data () {
    return {
      categoryOptions: [
        {
          value: null,
          text: this.$t('recipes.categories')
        },
        { value: 'appetizers-and-snacks', text: 'Appetizers & Snacks' },
        { value: 'breakfast-and-brunch', text: 'Breakfast & Brunch' },
        { value: 'desserts', text: 'Desserts' },
        { value: 'dinner', text: 'Dinner' },
        { value: 'drinks', text: 'Drinks' },
        { value: 'lunch', text: 'Lunch' }
      ],
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
  async fetch () {
    try {
      this.isPageLoading = true
      await this.$store.dispatch('recipes/getRecipesAction', this.$route.query)
    } finally {
      this.isPageLoading = false
    }
  },
  computed: {
    ...mapState('recipes', ['recipes', 'totalRecipes']),
    areRecipes () {
      return this.recipes.length > 0
    }
  },
  watch: {
    async '$route.query' () {
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
  created () {
    this.setLanguagesFromQueryString()
  },
  methods: {
    clearFilters () {
      this.$router.push(this.localePath('/recipes'))
      this.activeAllLanguages()
    },
    activeAllLanguages () {
      this.languages.forEach((_, index) => {
        this.languages[index].isActive = true
      })
    },
    setLanguagesFromQueryString () {
      const languagesQueryString = this.$route.query?.filters?.length
        ? JSON.parse(this.$route.query.filters).map(e => e.language)
        : []
      languagesQueryString.forEach((languageInQuerystring) => {
        this.languages.forEach((language, index) => {
          this.languages[index].isActive =
            language.text === languageInQuerystring
        })
      })
    },
    buildLanguageQueryString (languages) {
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
    userCanEdit (recipeAuthor) {
      return recipeAuthor === this.$store?.state?.user?.userId
    },
    async getRecipes () {
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
    async infiniteHandler ($state) {
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
  }
}
</script>
