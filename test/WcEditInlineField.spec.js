import { mount, createLocalVue } from '@vue/test-utils'
import WcEditInlineField from '@/components/forms/WcEditInlineField'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import Vuex from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

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

describe('WcButtonSubmit click', () => {
  test('WcButtonSubmit must exist', () => {
    expect(wrapper.findComponent(WcButtonSubmit).exists()).toBe(true)
  })
  test('When user click con WcButtonSubmit submit method must be called', async () => {
    const submit = jest.fn()
    wrapper.vm.submit = submit
    await wrapper.findComponent(WcButtonSubmit).trigger('click')
    expect(submit).toHaveBeenCalled()
  })
})
