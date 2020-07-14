import { mount, createLocalVue } from '@vue/test-utils'
import WcEditInlineField from '@/components/forms/WcEditInlineField'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import WcInput from '@/components/forms/WcInput'
import Vuex from 'vuex'
import { BootstrapVue, BButton } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use('b-button', BButton)

const store = new Vuex.Store({
  modules: {
    toast: {
      namespaced: true,
      state: {},
      mutations: {
        mutateShowToast: () => {}
      }
    }
  }
})

let wrapper
beforeAll(() => {
  wrapper = mount(WcEditInlineField, {
    localVue,
    store,
    mocks: {
      $t: (msg) => msg,
      $v: {
        value: {
          $error: {}
        }
      }
    },
    propsData: {
      id: 'user-name-collapse',
      endPointPath: '/'
    }
  })
})

describe('closeEdit method', () => {
  test('closeEdit method should be definded', () => {
    expect(wrapper.vm.closeEdit).toBeDefined()
  })
})

describe('edit method', () => {
  test('edit method should be definded', () => {
    expect(wrapper.vm.edit).toBeDefined()
  })
})

describe('submit method', () => {
  test('submit method should be definded', () => {
    expect(wrapper.vm.submit).toBeDefined()
  })
})

describe('WcButtonSubmit click', () => {
  test('WcButtonSubmit must exist', () => {
    expect(wrapper.findComponent(WcButtonSubmit).exists()).toBe(true)
  })
  test('When user click WcButtonSubmit submit method must be called', async () => {
    wrapper.vm.submit = jest.fn()
    await wrapper.findComponent(WcButtonSubmit).trigger('click')
    expect(wrapper.vm.submit).toHaveBeenCalled()
  })
})

describe('WcInput', () => {
  test('WcInput must exist', () => {
    expect(wrapper.findComponent(WcInput).exists()).toBe(true)
  })
  test('When user input a value in WcInput value data must store this value', async () => {
    wrapper.vm.submit = jest.fn()
    await wrapper
      .findComponent(WcInput)
      .find('input[type="text"]')
      .setValue('An x value')
    expect(wrapper.vm.value).toBe('An x value')
  })
})
