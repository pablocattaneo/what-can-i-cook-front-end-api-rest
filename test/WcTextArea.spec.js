import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import WcTextArea from '@/components/forms/WcTextArea'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
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
    expect(wrapper.props()).toHaveProperty('placeholder')
  })
})

describe('WcTextArea', () => {
  test('When user input a value in WcTextArea input event must be emmit', async () => {
    const textArea = wrapper.find('textarea')
    textArea.element.value = 'Foo'
    await textArea.trigger('input')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([textArea.element.value])
  })
})
