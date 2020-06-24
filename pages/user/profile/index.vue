<template>
  <h1>User profile</h1>
</template>

<script>
export default {
  async asyncData({ app, store }) {
    await app.$axios.$get(`user/${store.state.user.userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}
</script>

<style></style>
