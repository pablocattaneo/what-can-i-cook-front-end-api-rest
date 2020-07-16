<template>
  <div id="wc-page-recipe" class="container">
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
          :src="$store.state.apiRestBaseUrl + recipe.mainImg"
          :alt="recipe.title"
          fluid
          center
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-4">
        <h2>{{ $t('Ingredients') }}</h2>
        <ul>
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="`${index}-ingredient`"
            class="mt-2"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-4">
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
    <div class="row">
      <div class="col-12 mt-4">
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
export default {
  async asyncData({ app, route }) {
    const recipe = await app.$axios.$get(`/recipe-by-slug/${route.params.slug}`)
    return {
      recipe
    }
  }
}
</script>
