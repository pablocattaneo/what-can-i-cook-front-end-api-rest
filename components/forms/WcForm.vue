<template>
  <b-form id="form" novalidate @submit.prevent>
    <slot></slot>
  </b-form>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
export default {
  methods: {
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
      console.log('validateForm')
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
</script>
