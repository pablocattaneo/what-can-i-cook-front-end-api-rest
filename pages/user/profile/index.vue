<template>
  <div id="page-profile">
    <h1>User profile</h1>
  </div>
</template>

<script>
import wcHandleError from '@/mixins/wc-handle-error.js'
export default {
  mixins: [wcHandleError],
  async mounted() {
    try {
      this.$store.dispatch('user/getUserData')
      await this.$axios.$get(`user/${this.$store.state.user.userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    } catch (error) {
      this.serverErrorsHandler(error)
    }
  }
}
</script>

<style></style>
