export default {
  data() {
    return {
      isProcessingAuthentication: true
    }
  },
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
        throw error
      } finally {
        this.isProcessingAuthentication = false
      }
    }
  }
}
