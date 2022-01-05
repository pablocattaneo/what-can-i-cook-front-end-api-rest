import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import WcInput from '@/components/forms/WcInput'

const localVue = createLocalVue()

let wrapper
let input
beforeEach(() => {
  localVue.use(BootstrapVue)
  wrapper = mount(WcInput, { localVue })
  input = wrapper.find('input')
})

describe('WcInput', () => {
  test('When user input a value in WcInput input event must be emmit', async () => {
    input.element.value = 'foo'
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted().input).toHaveLength(1)
    expect(wrapper.emitted('input')[0]).toEqual([input.element.value])
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
  test('should call bFormInput.focus() method', async () => {
    jest.spyOn(wrapper.vm.$refs.bFormInput, 'focus')
    await wrapper.vm.focus()
    expect(wrapper.vm.$refs.bFormInput.focus).toHaveBeenCalled()
  })
})
