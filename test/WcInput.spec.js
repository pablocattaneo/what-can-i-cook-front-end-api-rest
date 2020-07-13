import { mount, createLocalVue } from '@vue/test-utils'
import WcInput from '@/components/forms/WcInput'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = mount(WcInput, { localVue })
})

describe('WcInput', () => {
  test('When user input a value in WcInput input event must be emmit', async () => {
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})

describe('Props type', () => {
  test('The component is well formed so prop type should exist', () => {
    expect(wrapper.vm).toHaveProperty('type')
  })
  test('Type props was set to text so input type text should be rendered', async () => {
    await wrapper.setProps({ type: 'text' })
    const input = wrapper.find('input')
    expect(input.attributes().type).toBe('text')
  })
  test('Type props was set to number so input type number should be rendered', async () => {
    await wrapper.setProps({ type: 'number' })
    const input = wrapper.find('input')
    expect(input.attributes().type).toBe('number')
  })
})
