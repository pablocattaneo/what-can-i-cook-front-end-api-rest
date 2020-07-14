import { mount, createLocalVue } from '@vue/test-utils'
import WcTextArea from '@/components/forms/WcTextArea'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
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
