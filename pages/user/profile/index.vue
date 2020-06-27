<template>
  <div id="page-profile">
    <h1>User profile</h1>
    <p>{{ `${$t('Name')}  ${user.name}` }}</p>
    <p>{{ `${$t('User_name')}  ${user.userName}` }}</p>
  </div>
</template>

<script>
import wcHandleError from '@/mixins/wc-handle-error.js'
export default {
  mixins: [wcHandleError],
  data() {
    return {
      user: {
        id: '',
        userName: '',
        name: '',
        lastName: '',
        email: ''
      }
    }
  },
  async mounted() {
    try {
      this.$store.dispatch('user/getUserData')
      const userDataGotFromServe = await this.$axios.$get(
        `user/${this.$store.state.user.userId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }
      )
      this.user.id = userDataGotFromServe._id
      this.user.userName = userDataGotFromServe.userName
      this.user.name = userDataGotFromServe.name
      this.user.lastName = userDataGotFromServe.lastName
      this.user.email = userDataGotFromServe.email
    } catch (error) {
      this.serverErrorsHandler(error)
    }
  }
}
</script>

<style></style>
