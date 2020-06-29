<template>
  <b-form id="wc-form" @submit.prevent novalidate>
    <slot></slot>
  </b-form>
</template>

<script>
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
    showToastFormError() {
      this.$bvToast.toast(this.$t('form_contains_errors'), {
        title: 'Error',
        toaster: 'b-toaster-bottom-center',
        variant: 'danger',
        solid: true
      })
    },
    errorScrollTo() {
      VueScrollTo.scrollTo('#wc-form', 1000, { offset: -60 })
    },
    validationForm(validation) {
      validation.$touch()
      if (validation.$error) {
        this.showToastFormError()
        this.errorScrollTo()
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('validation error')
      } else if (!validation.$pending || !validation.$error) {
        return Promise.resolve(true)
      } else {
        Promise.reject(new Error('validation error'))
      }
    }
  }
}
</script>
