<template>
  <div id="recipe-page" class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ recipe.title }}</h1>
      </div>
    </div>
    <div v-if="recipe.mainImg" class="row">
      <div class="col-12">
        <b-img
          :src="$store.state.apiRestBaseUrl + recipe.mainImg"
          :alt="recipe.title"
          fluid
          center
        />
      </div>
    </div>
    <div v-if="recipe.description" class="row">
      <div class="col-12">
        <h2>{{ $t('Description') }}</h2>
        <p>{{ recipe.description }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
      <div class="col-12">
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
