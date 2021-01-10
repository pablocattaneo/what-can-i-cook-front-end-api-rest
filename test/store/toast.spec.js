import { mutations } from '~/store/toast'

test('mutateShowToast should set isToastErrorVisible state property to true and errorToastParameter message with the value pass as a message property of the second argument ', () => {
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

test('mutateHideToast should set isToastErrorVisible state property to false ', () => {
  const state = {
    isToastErrorVisible: true
  }
  mutations.mutateHideToast(state)
  expect(state).toEqual({ isToastErrorVisible: false })
})

test('mutateResetIsToastErrorVisible should set isToastErrorVisible state property to false ', () => {
  const state = {
    isToastErrorVisible: true
  }
  mutations.mutateResetIsToastErrorVisible(state)
  expect(state).toEqual({ isToastErrorVisible: false })
})
