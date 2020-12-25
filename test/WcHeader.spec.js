import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcHeader from '@/components/WcHeader'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: {}
    }
  }
})

let wrapper
beforeAll(() => {
  // It removes boostrap warning in the way a member of Bootrap-vue recommend do it https://github.com/bootstrap-vue/bootstrap-vue/issues/3303\#issuecomment-492718875
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = shallowMount(WcHeader, {
    store,
    localVue,
    mocks: {
      localePath: () => {},
      switchLocalePath: () => {},
      $t: () => {}
    }
  })
})

describe('signOut method', () => {
  test('signOut method should be definded', () => {
    expect(wrapper.vm.signOut).toBeDefined()
  })
})
