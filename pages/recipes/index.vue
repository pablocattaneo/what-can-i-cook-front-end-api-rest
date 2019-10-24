<template>
  <div id="recipes">
    <b-card
      v-for="(recipe, recipesIndex) in recipes"
      :key="recipesIndex"
      :title="recipe.title"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
      border-variant="primary"
    >
      <b-img-lazy
        :src="recipe.thumbnailImg"
        width="100%"
        :alt="recipe.title"
        :title="recipe.title"
        :blank-src="null"
        class="mb-3"
      ></b-img-lazy>
      <b-card-text>
        {{ recipe.description }}
      </b-card-text>
      <b-list-group flush>
        <b-list-group-item
          v-for="(info, key, index) in recipe.more_info"
          :key="index + key"
          >{{ $t(`recipes.${key}`) }}: {{ info }}</b-list-group-item
        >
      </b-list-group>
      <template v-slot:footer>
        <b-button href="#" variant="primary">{{
          $t('recipes.buy_ingredients')
        }}</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const currentLang = context.app.i18n.locale
    const urlLangSantized = context.route.fullPath.replace(
      `/${currentLang}`,
      ''
    )
    const recipes = await context.app.$axios.$get(urlLangSantized)
    return {
      recipes
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  width 100%
</style>
