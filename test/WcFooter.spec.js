import { shallowMount } from '@vue/test-utils'
import WcFooter from '@/components/WcFooter'

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcFooter)
})

describe('Author Property', () => {
  test('Author was set to Pablo Cattaneo so component should render this text.', async () => {
    await wrapper.setProps({ author: 'Pablo Cattaneo' })
    expect(wrapper.find('#author').text()).toContain('Pablo Cattaneo')
  })
})
