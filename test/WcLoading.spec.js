import { shallowMount, createLocalVue } from '@vue/test-utils'
import { SpinnerPlugin } from 'bootstrap-vue'
import WcLoading from '@/components/WcLoading'
const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(SpinnerPlugin)
  wrapper = shallowMount(WcLoading, { localVue })
})

test('Sanity test', () => {
  expect(true).toBe(true)
})

test('Branch: Default. It verify if non-intentional changes were made.', () => {
  expect(wrapper.element).toMatchSnapshot()
})

test('should have wc-loading id', () => {
  expect(wrapper.attributes('id')).toBe('wc-loading')
})
