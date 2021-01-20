import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import { mutations, actions, state } from '~/store/user'

test('Sanity test', () => {
  expect(true).toBe(true)
})

describe('userLoginAction', () => {
  test('should set isUserLogged state to true', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.$axios = {
      $post: jest.fn()
    }
    store.$axios.$post.mockReturnValue({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8',
      userId: '5f3bba81f33c511a90455fa3'
    })
    store.dispatch('userLoginAction')
    await flushPromises()
    expect(store.state.isUserLogged).toBe(true)
  })
  test('should set jwt state to eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.$axios = {
      $post: jest.fn()
    }
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8'
    store.$axios.$post.mockReturnValue({
      token,
      userId: '5f3bba81f33c511a90455fa3'
    })
    store.dispatch('userLoginAction')
    await flushPromises()
    expect(store.state.jwt).toBe(token)
  })
  test('should set userId state to 5f3bba81f33c511a90455fa3', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.$axios = {
      $post: jest.fn()
    }
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTEwNTI2ODksImV4cCI6MTYxMTA1NjI4OX0.L9pR2IFbZBPYQWhL4nw47szrjRoVu1ULxj6RgV0Drs8'
    const userId = '5f3bba81f33c511a90455fa3'
    store.$axios.$post.mockReturnValue({
      token,
      userId
    })
    store.dispatch('userLoginAction')
    await flushPromises()
    expect(store.state.userId).toBe(userId)
  })
})

describe('setUserIdState', () => {
  test('localStorage item jwtToken contain a valid jwt so isUserLogged state is set with true value', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
    localStorage.getItem.mockReturnValue(jwt)
    store.dispatch('setUserIdState')
    await flushPromises()
    expect(store.state.isUserLogged).toBe(true)
  })

  test('localStorage item jwtToken contain a falsy value so isUserLogged state is set with false value', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    localStorage.getItem.mockReturnValue(false)
    store.dispatch('setUserIdState')
    await flushPromises()
    expect(store.state.isUserLogged).toBe(false)
  })

  test('localStorage item jwtToken contain eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA jwt so userId state is set with "5f3bba81f33c511a90455fa3" value', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjNiYmE4MWYzM2M1MTFhOTA0NTVmYTMiLCJpYXQiOjE2MTA2MTc4ODksImV4cCI6MTYxMDYyMTQ4OX0.qvLwYk6_ODEF6dAMcdEDNZUQR6cSjPElsZ3fC_fMIqA'
    localStorage.getItem.mockReturnValue(jwt)
    store.dispatch('setUserIdState')
    await flushPromises()
    expect(store.state.userId).toBe('5f3bba81f33c511a90455fa3')
  })
})

describe('userSignOutAction', () => {
  test('should set isUserLogged state to false', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
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
    const localVue = createLocalVue()
    localVue.use(Vuex)
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
    const localVue = createLocalVue()
    localVue.use(Vuex)
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
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeOtions = { mutations, actions, state: state() }
    const clonedStoreConfig = cloneDeep(storeOtions)
    const store = new Vuex.Store(clonedStoreConfig)
    store.dispatch('userSignOutAction')
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken')
  })
})
