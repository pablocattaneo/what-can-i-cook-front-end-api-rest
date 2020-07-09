<template>
  <div id="recipe-page" class="container">
    <h1>{{ recipe.title }}</h1>
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      this.recipe = await this.$axios.$get(
        `/recipe-by-slug/${this.$route.params.slug}`
      )
    } catch (error) {
      throw error
    }
  }
}
</script>
