import { mutations } from '~/store/toast'

test('mutateShowToast ', () => {
  const state = {
    isToastErrorVisible: false,
    errorToastParameter: {
      message: ''
    }
  }
  const error = {
    message: 'Error message'
  }
  mutations.mutateShowToast(state, error)
  expect(state).toEqual({
    isToastErrorVisible: true,
    errorToastParameter: {
      message: error.message
    }
  })
})
