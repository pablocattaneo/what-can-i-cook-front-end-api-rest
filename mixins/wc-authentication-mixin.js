export default {
  data () {
    return {
      isProcessingAuthentication: true
    }
  },
  methods: {
    async authenticate () {
      try {
        this.$store.dispatch('user/setUserIdState')
        this.isProcessingAuthentication = false
        return await this.$axios.$get(
          `user/${this.$store.state.user.userId || null}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
          }
        )
      } catch (error) {
        this.isProcessingAuthentication = false
        throw error
      }
    }
  }
}
