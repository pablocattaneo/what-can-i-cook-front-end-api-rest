import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcHeader from '@/components/WcHeader'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
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
