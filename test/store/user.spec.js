import { mutations } from '~/store/user'

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
})
