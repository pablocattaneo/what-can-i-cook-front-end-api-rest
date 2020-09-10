<template>
  <div id="wc-page-recipe">
    <div class="row">
      <div class="col-12 mt-4">
        <h1>{{ recipe.title }}</h1>
      </div>
    </div>
    <div v-if="recipe.description" class="row">
      <div class="col-12 mt-4">
        <p>{{ recipe.description }}</p>
      </div>
    </div>
    <div v-if="recipe.mainImg" class="row">
      <div class="col-12 mt-4">
        <b-img
          :src="recipeImage"
          :alt="recipe.title"
          @error="onError"
          fluid
          center
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5">
        <h2>
          <BIconListTask class="mr-1" />
          {{ $t('Ingredients') }}
        </h2>
        <ul>
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="`${index}-ingredient`"
            class="mt-3"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5">
        <h2>{{ $t('Directions') }}</h2>
        <ol>
          <li
            v-for="(direction, index) in recipe.directions"
            :key="`${index}-direction`"
            class="mt-2"
          >
            {{ direction }}
          </li>
        </ol>
      </div>
    </div>
    <div v-if="mustShowMoreInfoSection" class="row">
      <div class="col-12 mt-5">
        <h2>{{ $t('More_info') }}</h2>
        <b-list-group>
          <template v-for="(info, key, index) in recipe.more_info">
            <b-list-group-item v-if="info" :key="`${index}-more-info`"
              >{{ $t(`recipes.${key}`) }}: {{ info }}</b-list-group-item
            >
          </template>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconListTask } from 'bootstrap-vue'

export default {
  components: {
    BIconListTask
  },
  computed: {
    mustShowMoreInfoSection() {
      return Object.keys(this.recipe.more_info).find(
        (key) => !!this.recipe.more_info[key]
      )
    },
    recipeImage() {
      if (this.errorOnImage) {
        return require('@/assets/img/logo.svg')
      } else {
        return (
          this.$store.state.apiRestBaseUrl + this.recipe.mainImg ||
          require('@/assets/img/logo.svg')
        )
      }
    }
  },
  async asyncData({ app, route }) {
    const recipe = await app.$axios.$get(`/recipe-by-slug/${route.params.slug}`)
    return {
      recipe,
      errorOnImage: false
    }
  },
  methods: {
    onError() {
      this.errorOnImage = true
    }
  }
}
</script>
