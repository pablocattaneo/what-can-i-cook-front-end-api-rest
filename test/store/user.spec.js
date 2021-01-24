import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { mutations, actions, state } from '@/store/user'

let store = {}
beforeEach(() => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const storeOtions = { mutations, actions, state: state() }
  const clonedStoreConfig = cloneDeep(storeOtions)
  store = new Vuex.Store(clonedStoreConfig)
  store.$axios = {
    $post: jest.fn()
  }
})

test('Sanity test', () => {
  expect(true).toBe(true)
})

describe('userLoginAction', () => {
  test('should set isUserLogged state to true', async () => {
    store.$axios.$post.mockReturnValue({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8',
      userId: '5f3bba81f33c511a90455fa3'
    })
    await store.dispatch('userLoginAction')
    expect(store.state.isUserLogged).toBe(true)
  })
  test('should set jwt state to eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8'
    store.$axios.$post.mockReturnValue({
      token,
      userId: '5f3bba81f33c511a90455fa3'
    })
    await store.dispatch('userLoginAction')
    expect(store.state.jwt).toBe(token)
  })
  test('should set userId state to 5f3bba81f33c511a90455fa3', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8'
    const userId = '5f3bba81f33c511a90455fa3'
    store.$axios.$post.mockReturnValue({
      token,
      userId
    })
    await store.dispatch('userLoginAction')
    expect(store.state.userId).toBe(userId)
  })
  test('Should call localStorage.setItem with jwtToken and eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8 as arguments', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8'
    const userId = '5f3bba81f33c511a90455fa3'
    store.$axios.$post.mockReturnValue({
      token,
      userId
    })
    await store.dispatch('userLoginAction')
    expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', token)
  })
  test('The request post request fail so userLoginAction should set isUserLogged state to false', async () => {
    store.state.isUserLogged = true
    store.$axios.$post.mockRejectedValue('Async error')
    try {
      await store.dispatch('userLoginAction')
    } catch (error) {
      // It handle exception throw by user userLoginAction in order to avoid it breaks the test
    }
    expect(store.state.isUserLogged).toBe(false)
  })
})

describe('setUserIdState', () => {
  test('localStorage item jwtToken contain a valid jwt so isUserLogged state is set with true value', async () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
    localStorage.getItem.mockReturnValue(jwt)
    store.dispatch('setUserIdState')
    expect(store.state.isUserLogged).toBe(true)
  })

  test('localStorage item jwtToken contain a falsy value so isUserLogged state is set with false value', async () => {
    localStorage.getItem.mockReturnValue(false)
    store.dispatch('setUserIdState')
    expect(store.state.isUserLogged).toBe(false)
  })

  test('localStorage item jwtToken contain eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA jwt so userId state is set with "5f3bba81f33c511a90455fa3" value', async () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
    localStorage.getItem.mockReturnValue(jwt)
    store.dispatch('setUserIdState')
    expect(store.state.userId).toBe('5f3bba81f33c511a90455fa3')
  })
})

describe('userSignOutAction', () => {
  test('should set isUserLogged state to false', () => {
    const stateWithIsUserLoggedSetToTrue = { ...state(), isUserLogged: true }
    const storeOtions = {
      mutations,
      actions,
      state: stateWithIsUserLoggedSetToTrue
    }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.dispatch('userSignOutAction')
    expect(store.state.isUserLogged).toBe(false)
  })
  test('should set jwt state to empty string', () => {
    const stateWithJwtSetTo123 = { ...state(), jwt: '123' }
    const storeOtions = {
      mutations,
      actions,
      state: stateWithJwtSetTo123
    }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.dispatch('userSignOutAction')
    expect(store.state.jwt).toBe('')
  })
  test('should set userId state to empty string', () => {
    const stateWithUserIdSetToValidId = {
      ...state(),
      userId: '5f3bba81f33c511a90455fa3'
    }
    const storeOtions = {
      mutations,
      actions,
      state: stateWithUserIdSetToValidId
    }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.dispatch('userSignOutAction')
    expect(store.state.userId).toBe('')
  })
  test('Should call localStorage.removeItem with jwtToken as argument', () => {
    store.dispatch('userSignOutAction')
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken')
  })
})
