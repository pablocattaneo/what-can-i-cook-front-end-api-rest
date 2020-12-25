import { mount, createLocalVue } from '@vue/test-utils'
import WcTextArea from '@/components/forms/WcTextArea'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeAll(() => {
  // It removes boostrap warning in the way a member of Bootrap-vue recommend do it https://github.com/bootstrap-vue/bootstrap-vue/issues/3303\#issuecomment-492718875
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = mount(WcTextArea, {
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

describe('WcTextArea', () => {
  test('When user input a value in WcTextArea input event must be emmit', async () => {
    await wrapper.find('textarea').trigger('input')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
