import { mount, createLocalVue } from '@vue/test-utils'
import WcInput from '@/components/forms/WcInput'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
let input
beforeAll(() => {
  // It removes boostrap warning in the way a member of Bootrap-vue recommend do it https://github.com/bootstrap-vue/bootstrap-vue/issues/3303\#issuecomment-492718875
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = mount(WcInput, { localVue })
  input = wrapper.find('input')
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
  test('Type props was no set so input type text should be rendered', () => {
    expect(input.attributes().type).toBe('text')
  })
  test('Type props was set to text so input type text should be rendered', async () => {
    await wrapper.setProps({ type: 'text' })
    expect(input.attributes().type).toBe('text')
  })
  test('Type props was set to number so input type number should be rendered', async () => {
    await wrapper.setProps({ type: 'number' })
    expect(input.attributes().type).toBe('number')
  })
})

describe('Props id', () => {
  test('The component is well formed so prop id should exist', () => {
    expect(wrapper.vm).toHaveProperty('id')
  })
})

describe('Props placeholder', () => {
  test('The component is well formed so prop placeholder should exist', () => {
    expect(wrapper.vm).toHaveProperty('placeholder')
  })
})

describe('Focus method', () => {
  test('Focus method should be definded', () => {
    expect(wrapper.vm.focus).toBeDefined()
  })
})
