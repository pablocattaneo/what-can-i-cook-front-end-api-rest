import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcFile from '@/components/forms/WcFile'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcFile, { localVue })
})

describe('change method', () => {
  test('change method should be definded', () => {
    expect(wrapper.vm.change).toBeDefined()
  })
})

describe('Props placeholder', () => {
  test('The component is well formed so prop placeholder should exist', () => {
    expect(wrapper.vm).toHaveProperty('placeholder')
  })
})

describe('Props buttonTextValue', () => {
  test('The component is well formed so prop buttonTextValue should exist', () => {
    expect(wrapper.vm).toHaveProperty('buttonTextValue')
  })
})
