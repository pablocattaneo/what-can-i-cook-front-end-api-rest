import { mount, createLocalVue } from '@vue/test-utils'
import WcInput from '@/components/forms/WcInput'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = mount(WcInput, {
    localVue,
    mocks: {
      $t: (msg) => msg,
      $v: {
        value: {
          $error: {}
        }
      }
    }
  })
})

describe('WcInput', () => {
  test('When user input a value in WcInput input event must be emmit', async () => {
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
