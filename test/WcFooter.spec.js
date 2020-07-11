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

describe('StackOverflow link', () => {
  test('stackoverflowUserProfileUrl props was set to https://stackoverflow.com/users/3599272/pablo so component should be rendered.', async () => {
    await wrapper.setProps({
      stackoverflowUserProfileUrl:
        'https://stackoverflow.com/users/3599272/pablo'
    })
    expect(wrapper.find('a#stackoverflow-user-profile-url').exists()).toBe(true)
  })
  test('stackoverflowUserProfileUrl props was set to https://stackoverflow.com/users/3599272/pablo so component should a link elemnt whith this value in this href property.', async () => {
    await wrapper.setProps({
      stackoverflowUserProfileUrl:
        'https://stackoverflow.com/users/3599272/pablo'
    })
    expect(
      wrapper.find('a#stackoverflow-user-profile-url').attributes().href
    ).toBe('https://stackoverflow.com/users/3599272/pablo')
  })
})
