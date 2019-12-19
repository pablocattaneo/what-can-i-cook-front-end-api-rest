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
      if (error.response.status === 422) {
        console.log('error.response.data:', error.response.data)
        console.log('error.response.status', error.response.status)
        console.log('error.response.headers', error.response.headers)
      }
      console.log('Error in validation')
    }
  }
}
