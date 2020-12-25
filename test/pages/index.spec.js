import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  localVue.use(BootstrapVue)
  wrapper = mount(Index, {
    localVue,
    mocks: {
      $t: () => {},
      localePath: () => ''
    },
    stubs: {
      NuxtLink: RouterLinkStub
    },
    data() {
      return {
        backEndTechnologies: [
          {
            html: '<a href="https://nodejs.org/en/" target="_blank">Node</a>',
            img: {
              src: '/',
              alt: 'Node'
            }
          }
        ],
        frontEndTechnologies: [
          {
            html:
              'First Server Side Rendering using: <a href="https://nuxtjs.org/" target="_blank">Nuxt</a>',
            img: {
              src: '/',
              alt: 'Nuxt'
            }
          }
        ]
      }
    }
  })
})

describe('Componets markup', () => {
  test('The component is well formed contain css class container', () => {
    expect(wrapper.find('#wc-page-index').exists()).toBe(true)
  })
})
