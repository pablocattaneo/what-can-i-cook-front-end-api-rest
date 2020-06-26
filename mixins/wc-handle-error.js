import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('user', ['isUserLoggedMutation']),
    serverErrorsHandler(error) {
      const errorToastParameter = {
        message: '',
        body: {
          title: 'Error',
          autoHideDelay: 15000,
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        }
      }
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('error.response', error.response)
        errorToastParameter.message =
          error.response?.data?.customErrorMessage || error.response.statusText
        if (error.response.data.isArray) {
          error.response.data.errors.forEach(() => {
            this.$bvToast.toast(
              errorToastParameter.message,
              errorToastParameter.body
            )
          })
        } else {
          console.log('error.response', error.response)
          this.$bvToast.toast(
            errorToastParameter.message,
            errorToastParameter.body
          )
          if (error.response.status === 401) {
            this.isUserLoggedMutation(false)
            this.$router.push('/login')
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request', error.request)
        this.$bvToast.toast(
          this.$t('errors.server_is_down'),
          errorToastParameter.body
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(
          'Something happened in setting up the request that triggered an Error'
        )
        errorToastParameter.message = error.message
        this.$bvToast.toast(
          errorToastParameter.message,
          errorToastParameter.body
        )
      }
    }
  }
}
