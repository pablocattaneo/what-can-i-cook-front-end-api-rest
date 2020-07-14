import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Index from '@/pages/about/index.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = mount(Index, {
    localVue,
    mocks: {
      $t: () => {}
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
})

describe('Componets markup', () => {
  test('The component is well formed contain css class container', () => {
    expect(wrapper.classes()).toContain('Content')
  })
})
