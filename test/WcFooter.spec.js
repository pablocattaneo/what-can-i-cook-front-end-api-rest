import { mount, createLocalVue } from '@vue/test-utils'
import WcFooter from '@/components/WcFooter'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
  wrapper = mount(WcFooter, {
    localVue
  })
})

describe('Author Property', () => {
  test('Author name property was set to Pablo Cattaneo so component should render this text.', async () => {
    await wrapper.setProps({ author: { name: 'Pablo Cattaneo' } })
    expect(wrapper.find('#author').text()).toContain('Pablo Cattaneo')
  })
  test('Author externalLink was set to https://www.linkedin.com/in/cattaneopablo/ so component should render this a element with href with this value.', async () => {
    await wrapper.setProps({
      author: { externalLink: 'https://www.linkedin.com/in/cattaneopablo/' }
    })
    expect(wrapper.find('#author a').attributes().href).toBe(
      'https://www.linkedin.com/in/cattaneopablo/'
    )
  })
  test('Author externalLink was falsy so component should render span element instead a link.', async () => {
    await wrapper.setProps({
      author: { externalLink: '' }
    })
    expect(wrapper.find('#author a').exists()).toBe(false)
    expect(wrapper.find('#author span').exists()).toBe(true)
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
