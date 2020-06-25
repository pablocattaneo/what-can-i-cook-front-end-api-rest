export default {
  methods: {
    _errorToast(
      message,
      body = {
        title: 'Error',
        autoHideDelay: 15000,
        toaster: 'b-toaster-top-center',
        variant: 'danger',
        solid: true
      }
    ) {
      this.$bvToast.toast(message, body)
    },
    serverErrorsHandler(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.isArray) {
          error.response.data.errors.forEach((element) => {
            this._errorToast(element.msg)
          })
        } else {
          console.log('21')
          this._errorToast(error.response.data)
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        this._errorToast(this.$t('errors.server_is_down'))
      } else {
        // Something happened in setting up the request that triggered an Error
        this._errorToast(error.message)
      }
    }
  }
}
