import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = mount(Index, {
    localVue,
    mocks: {
      $t: () => {},
      localePath: () => ''
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
})

describe('Componets markup', () => {
  test('The component is well formed contain css class container', () => {
    expect(wrapper.find('#wc-page-index').exists()).toBe(true)
  })
})
