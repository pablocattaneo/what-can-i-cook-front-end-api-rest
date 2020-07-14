import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcTextArea from '@/components/forms/WcTextArea'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcTextArea, {
    localVue,
    mocks: {
      $t: () => {}
    }
  })
})

describe('Props placeholder', () => {
  test('The component is well formed so prop placeholder should exist', () => {
    expect(wrapper.vm).toHaveProperty('placeholder')
  })
})
