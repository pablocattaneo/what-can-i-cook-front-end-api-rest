<template>
  <b-form novalidate @submit.prevent>
    <slot></slot>
  </b-form>
</template>

<script>
export default {
  methods: {
    validationForm(validation) {
      validation.$touch()
      console.log('validateForm')
      if (validation.$error) {
        // this.showToastFormError()
        // this.errorScrollTo()
        return Promise.reject(new Error('validation error'))
      } else if (!validation.$pending || !validation.$error) {
        return Promise.resolve(true)
      } else {
        Promise.reject(new Error('validation error'))
      }
    }
  }
}
</script>
