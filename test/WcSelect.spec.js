import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcSelect from '@/components/forms/WcSelect'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcSelect, {
    localVue,
    mocks: {
      $t: () => {}
    }
  })
})

describe('Props options', () => {
  test('The component is well formed so prop options should exist', () => {
    expect(wrapper.vm).toHaveProperty('options')
  })
})
