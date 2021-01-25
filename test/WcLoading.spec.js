import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcLoading from '@/components/WcLoading'
import { SpinnerPlugin } from 'bootstrap-vue'
const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(SpinnerPlugin)
  wrapper = shallowMount(WcLoading, { localVue })
})

test('It verify if non-intentional changes were made.', () => {
  expect(wrapper.element).toMatchSnapshot()
})

test('should have wc-loading id', () => {
  expect(wrapper.attributes('id')).toBe('wc-loading')
})
