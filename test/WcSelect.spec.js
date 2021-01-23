import { mount, createLocalVue } from '@vue/test-utils'
import WcSelect from '@/components/forms/WcSelect'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(BootstrapVue)
  wrapper = mount(WcSelect, {
    localVue,
    mocks: {
      $t: () => {}
    }
  })
})

describe('Props options', () => {
  test('The component is well formed so prop options should exist', () => {
    expect(wrapper.props()).toHaveProperty('options')
  })
})

describe('WcSelect', () => {
  test('When user input a value in WcSelect input event must be emmit', async () => {
    await wrapper.find('select').trigger('change')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
