import { shallowMount, createLocalVue } from '@vue/test-utils'
import WcFooter from '@/components/WcFooter'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeAll(() => {
  // It removes boostrap warning in the way a member of Bootrap-vue recommend do it https://github.com/bootstrap-vue/bootstrap-vue/issues/3303\#issuecomment-492718875
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = shallowMount(WcFooter, {
    localVue,
    mocks: {
      $t: () => {}
    }
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
  test('stackoverflowUserProfileUrl props was set to https://stackoverflow.com/users/3599272/pablo so component should render a link elemnt whith this value in this href property.', async () => {
    await wrapper.setProps({
      stackoverflowUserProfileUrl:
        'https://stackoverflow.com/users/3599272/pablo'
    })
    expect(
      wrapper.find('a#stackoverflow-user-profile-url').attributes('href')
    ).toBe('https://stackoverflow.com/users/3599272/pablo')
  })
})

describe('linkedinProfileUrl link', () => {
  test('linkedinProfileUrl props was set to https://www.linkedin.com/in/cattaneopablo/ so component should render a link elemnt whith this value in this href property.', async () => {
    await wrapper.setProps({
      linkedinProfileUrl: 'https://www.linkedin.com/in/cattaneopablo/'
    })
    expect(wrapper.find('a#linkdin-url').attributes('href')).toBe(
      'https://www.linkedin.com/in/cattaneopablo/'
    )
  })
})
