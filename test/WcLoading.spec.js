import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcLoading from '@/components/WcLoading'
import { SpinnerPlugin } from 'bootstrap-vue'
const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(SpinnerPlugin)
  wrapper = shallowMount(WcLoading, { localVue })
})

test('should have wc-loading id', () => {
  expect(wrapper.attributes('id')).toBe('wc-loading')
})
