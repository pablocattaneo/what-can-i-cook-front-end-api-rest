export default {
  methods: {
    stringToArray(string, regex = /[\n\r]/g) {
      return string.split(regex)
    },
    arrayToString(array, regex = /[\n\r]/g) {
      return array.toString()
    }
  }
}
