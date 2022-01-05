import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import WcFile from '@/components/forms/WcFile'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(BootstrapVue)
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
