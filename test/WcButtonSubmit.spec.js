import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = shallowMount(WcButtonSubmit, {
    localVue,
    mocks: {
      $t: () => {}
    }
  })
})

describe('Props isProcessing', () => {
  test('The component is well formed so prop isProcessing should exist', () => {
    expect(wrapper.vm).toHaveProperty('isProcessing')
  })
})

describe('Props disabled', () => {
  test('The component is well formed so prop disabled should exist', () => {
    expect(wrapper.vm).toHaveProperty('disabled')
  })
})

describe('Props buttonTextValue', () => {
  test('The component is well formed so prop buttonTextValue should exist', () => {
    expect(wrapper.vm).toHaveProperty('buttonTextValue')
  })
})

describe('Props processingTextValue', () => {
  test('The component is well formed so prop processingTextValue should exist', () => {
    expect(wrapper.vm).toHaveProperty('processingTextValue')
  })
})
