import { mutations, actions } from '~/store/user'

test('Sanity test', () => {
  expect(true).toBe(true)
})

describe('Mutations', () => {
  test('isUserLoggedMutation was called with true as payload so state.isUserLogged should be true ', () => {
    const state = { isUserLogged: false }
    mutations.isUserLoggedMutation(state, true)
    expect(state).toEqual({ isUserLogged: true })
  })
  test('jwtMutation was called with "123" as payload so state.jwt should be "123"', () => {
    const state = { jwt: '' }
    mutations.jwtMutation(state, '123')
    expect(state).toEqual({ jwt: '123' })
  })
  test('userIdMutation was called with "1" as payload so state.jwt should be "1"', () => {
    const state = { userId: '' }
    mutations.userIdMutation(state, '1')
    expect(state).toEqual({ userId: '1' })
  })
})

describe('Action userSignOutAction', () => {
  test('Should call localStorage.removeItem with jwtToken as argument', () => {
    const context = {
      commit: jest.fn()
    }
    actions.userSignOutAction(context)
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken')
  })
  test('userSignOutAction should commit isUserLoggedMutation mutation with false as a payload', () => {
    const context = {
      commit: jest.fn()
    }
    actions.userSignOutAction(context)
    expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', false)
  })
  test('userSignOutAction should commit jwtMutation mutation empty string as a payload', () => {
    const context = {
      commit: jest.fn()
    }
    actions.userSignOutAction(context)
    expect(context.commit).toHaveBeenCalledWith('jwtMutation', '')
  })
  test('userSignOutAction should commit userIdMutation mutation empty string as a payload', () => {
    const context = {
      commit: jest.fn()
    }
    actions.userSignOutAction(context)
    expect(context.commit).toHaveBeenCalledWith('userIdMutation', '')
  })
})

describe('Action setUserIdState', () => {
  test('Should call localStorage.getItem with "jwtToken" as argument', () => {
    const context = {
      commit: jest.fn()
    }
    actions.setUserIdState(context)
    expect(localStorage.getItem).toHaveBeenCalledWith('jwtToken')
  })
  test('localStorage item jwtToken return with falsy value so setUserIdState should commit isUserLoggedMutation mutation with false as a payload', () => {
    const context = {
      commit: jest.fn()
    }
    actions.setUserIdState(context)
    expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', false)
  })
  test('localStorage item jwtToken return with a valid jwt so setUserIdState should commit isUserLoggedMutation mutation with true as a payload', () => {
    const context = {
      commit: jest.fn()
    }
    localStorage.getItem.mockReturnValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
    )
    actions.setUserIdState(context)
    expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', true)
  })
})
