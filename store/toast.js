export const state = () => ({
  isToastErrorVisible: false,
  errorToastParameter: {
    message: '',
    body: {
      title: 'Error',
      autoHideDelay: 15000,
      toaster: 'b-toaster-top-center',
      variant: 'danger',
      solid: true
    }
  }
})

export const mutations = {
  mutateShowToast(state, error) {
    state.errorToastParameter.message = error.message
    state.isToastErrorVisible = true
  },
  mutateHideToast(stater) {
    state.isToastErrorVisible = false
  },
  mutateIsToastErrorVisible(state, payload) {
    state.isToastErrorVisible = payload
  }
}
