export default {
  methods: {
    async authenticate() {
      try {
        this.$store.dispatch('user/setUserIdState')
        return await this.$axios.$get(`user/${this.$store.state.user.userId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        })
      } catch (error) {
        this.$router.push(this.localePath('/login'))
        this.serverErrorsHandler(error)
      }
    }
  }
}
