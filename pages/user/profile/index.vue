<template>
  <h1>User profile</h1>
</template>

<script>
export default {
  async mounted() {
    this.$store.dispatch('user/getUserData')
    await this.$axios.$get(`user/${this.$store.state.user.userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}
</script>

<style></style>
