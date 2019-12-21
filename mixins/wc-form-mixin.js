import VueScrollTo from 'vue-scrollto'
export default {
  data() {
    return {
      isFormProcessing: false
    }
  },
  methods: {
    stringToArray(string, regex = /[\n\r]/g) {
      return string.split(regex)
    },
    arrayToString(array, regex = /[\n\r]/g) {
      return array.toString()
    },
    serverErrorsHandler(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('error.response.data', error.response.data)
        console.log('error.response.status', error.response.status)
        console.log('error.response.headers', error.response.headers)
        error.response.data.errors.forEach((element) => {
          this.$bvToast.toast(element.msg, {
            title: 'Error',
            autoHideDelay: 15000,
            toaster: 'b-toaster-top-center',
            variant: 'danger',
            solid: true
          })
        })
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request', error.request)
        this.$bvToast.toast(this.$t('errors.server_is_down'), {
          title: 'Error',
          autoHideDelay: 15000,
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        })
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
        this.$bvToast.toast(error.message), {
          title: 'Error',
          autoHideDelay: 15000,
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        })
      }
    },
    showToastFormError() {
      this.$bvToast.toast('El formulario contiene errores', {
        title: 'Error',
        toaster: 'b-toaster-bottom-center',
        variant: 'danger',
        solid: true
      })
    },
    errorScrollTo() {
      VueScrollTo.scrollTo('#form', 1000, { offset: -60 })
    },
    validationForm(validation) {
      validation.$touch()
      if (validation.$error) {
        this.showToastFormError()
        this.errorScrollTo()
        return Promise.reject(new Error('validation error'))
      } else if (!validation.$pending || !validation.$error) {
        return Promise.resolve(true)
      } else {
        Promise.reject(new Error('validation error'))
      }
    }
  }
}
