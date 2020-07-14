import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcForm from '@/components/forms/WcForm'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcForm, { localVue })
})

describe('stringToArray method', () => {
  test('stringToArray method should be definded', () => {
    expect(wrapper.vm.stringToArray).toBeDefined()
  })
})

describe('arrayToString method', () => {
  test('arrayToString method should be definded', () => {
    expect(wrapper.vm.arrayToString).toBeDefined()
  })
})

describe('showToastFormError method', () => {
  test('showToastFormError method should be definded', () => {
    expect(wrapper.vm.showToastFormError).toBeDefined()
  })
})

describe('errorScrollTo method', () => {
  test('errorScrollTo method should be definded', () => {
    expect(wrapper.vm.errorScrollTo).toBeDefined()
  })
})

describe('validationForm method', () => {
  test('validationForm method should be definded', () => {
    expect(wrapper.vm.validationForm).toBeDefined()
  })
})
