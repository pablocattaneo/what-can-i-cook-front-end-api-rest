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
        if (error.response.status === 422) {
          console.log('error.response.data:', error.response.data)
          console.log('error.response.status', error.response.status)
          console.log('error.response.headers', error.response.headers)
        }
      }
      console.log('Error in validation')
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
