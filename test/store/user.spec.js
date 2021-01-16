import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import { mutations, actions, state } from '~/store/user'

test('Sanity test', () => {
  expect(true).toBe(true)
})

test('localStorage item jwtToken contain a valid jwt so isUserLogged state is set with true value', async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const storeOtions = { mutations, actions, state: state() }
  const clonedStoreConfig = cloneDeep(storeOtions)
  const store = new Vuex.Store(clonedStoreConfig)
  localStorage.getItem.mockReturnValue(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
  )
  store.dispatch('setUserIdState')
  await flushPromises()
  expect(store.state.isUserLogged).toBe(true)
})

// describe('Mutations', () => {
//   test('isUserLoggedMutation was called with true as payload so state.isUserLogged should be true ', () => {
//     const state = { isUserLogged: false }
//     mutations.isUserLoggedMutation(state, true)
//     expect(state).toEqual({ isUserLogged: true })
//   })
//   test('jwtMutation was called with "123" as payload so state.jwt should be "123"', () => {
//     const state = { jwt: '' }
//     mutations.jwtMutation(state, '123')
//     expect(state).toEqual({ jwt: '123' })
//   })
//   test('userIdMutation was called with "1" as payload so state.jwt should be "1"', () => {
//     const state = { userId: '' }
//     mutations.userIdMutation(state, '1')
//     expect(state).toEqual({ userId: '1' })
//   })
// })

// describe('Action userSignOutAction', () => {
//   test('Should call localStorage.removeItem with jwtToken as argument', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.userSignOutAction(context)
//     expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken')
//   })
//   test('userSignOutAction should commit isUserLoggedMutation mutation with false as a payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.userSignOutAction(context)
//     expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', false)
//   })
//   test('userSignOutAction should commit jwtMutation mutation empty string as a payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.userSignOutAction(context)
//     expect(context.commit).toHaveBeenCalledWith('jwtMutation', '')
//   })
//   test('userSignOutAction should commit userIdMutation mutation empty string as a payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.userSignOutAction(context)
//     expect(context.commit).toHaveBeenCalledWith('userIdMutation', '')
//   })
// })

// describe('Action setUserIdState', () => {
//   test('Should call localStorage.getItem with "jwtToken" as argument', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.setUserIdState(context)
//     expect(localStorage.getItem).toHaveBeenCalledWith('jwtToken')
//   })
//   test('localStorage item jwtToken return with falsy value so setUserIdState should commit isUserLoggedMutation mutation with false as a payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     actions.setUserIdState(context)
//     expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', false)
//   })
//   test('localStorage item jwtToken return with a valid jwt so setUserIdState should commit isUserLoggedMutation mutation with true as a payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     localStorage.getItem.mockReturnValue(
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
//     )
//     actions.setUserIdState(context)
//     expect(context.commit).toHaveBeenCalledWith('isUserLoggedMutation', true)
//   })
//   test('localStorage item jwtToken return with a valid jwt so setUserIdState should commit userIdMutation mutation with 5f3bba81f33c511a90455fa3 as payload', () => {
//     const context = {
//       commit: jest.fn()
//     }
//     localStorage.getItem.mockReturnValue(
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
//     )
//     actions.setUserIdState(context)
//     expect(context.commit).toHaveBeenCalledWith(
//       'userIdMutation',
//       '5f3bba81f33c511a90455fa3'
//     )
//   })
// })
