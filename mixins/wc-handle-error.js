export default {
  methods: {
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
        if (error.response.data.isArray) {
          error.response.data.errors.forEach((element) => {
            errorToastParameter.message = element.msg
            this.$bvToast.toast(
              errorToastParameter.message,
              errorToastParameter.body
            )
          })
        } else {
          switch (error.response.status) {
            case 401:
              errorToastParameter.message = 'Unauthorized'
              break

            default:
              errorToastParameter.message = error.response.data
              break
          }
          this.$bvToast.toast(
            errorToastParameter.message,
            errorToastParameter.body
          )
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        this.$bvToast.toast(
          this.$t('errors.server_is_down'),
          errorToastParameter.body
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        errorToastParameter.message = error.message
        this.$bvToast.toast(
          errorToastParameter.message,
          errorToastParameter.body
        )
      }
    }
  }
}
