import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import WcFooter from '@/components/WcFooter'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(BootstrapVue)
  wrapper = shallowMount(WcFooter, {
    localVue,
    mocks: {
      $t: () => {}
    }
  })
})

describe('Snapshots', () => {
  test('Branch: Default. It verify if non-intentional changes were made.', () => {
    expect(wrapper.element).toMatchSnapshot()
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
    expect(wrapper.find('#author a').attributes('href')).toBe(
      'https://www.linkedin.com/in/cattaneopablo/'
    )
  })
  test('Branch: Author externalLink was set to https://www.linkedin.com/in/cattaneopablo/ it verify if non-intentional changes were made for this output.', async () => {
    await wrapper.setProps({
      author: { externalLink: 'https://www.linkedin.com/in/cattaneopablo/' }
    })
    expect(wrapper.element).toMatchSnapshot()
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
  test('Branch: stackoverflowUserProfileUrl props was set to https://stackoverflow.com/users/3599272/pablo it verify if non-intentional changes were made for this output.', async () => {
    await wrapper.setProps({
      stackoverflowUserProfileUrl:
        'https://stackoverflow.com/users/3599272/pablo'
    })
    expect(wrapper.element).toMatchSnapshot()
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
  test('Branch: linkedinProfileUrl props was set to https://www.linkedin.com/in/cattaneopablo/ so it verify if non-intentional changes were made for this output.', async () => {
    await wrapper.setProps({
      linkedinProfileUrl: 'https://www.linkedin.com/in/cattaneopablo/'
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
