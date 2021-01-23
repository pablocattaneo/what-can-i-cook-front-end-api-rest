import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
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
    expect(wrapper.props()).toHaveProperty('isProcessing')
  })
})

describe('Props disabled', () => {
  test('The component is well formed so prop disabled should exist', () => {
    expect(wrapper.props()).toHaveProperty('disabled')
  })
})

describe('Props buttonTextValue', () => {
  test('The component is well formed so prop buttonTextValue should exist', () => {
    expect(wrapper.props()).toHaveProperty('buttonTextValue')
  })
})

describe('Props processingTextValue', () => {
  test('The component is well formed so prop processingTextValue should exist', () => {
    expect(wrapper.props()).toHaveProperty('processingTextValue')
  })
})
