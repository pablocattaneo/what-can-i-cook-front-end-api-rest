<template>
  <h1>recipes</h1>
</template>

<script>
export default {
  async asyncData(context) {
    const recipes = await context.app.$axios.$get('recipes/')
    return {
      recipes
    }
  }
}
</script>

<style></style>
