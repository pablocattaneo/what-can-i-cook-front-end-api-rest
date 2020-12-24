import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeAll(() => {
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
          },
          {
            html:
              '<a href="https://expressjs.com/" target="_blank">Express</a>',
            img: {
              src: '/',
              alt: 'Express'
            }
          },
          {
            html:
              '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>',
            img: {
              src: '/',
              alt: 'Mongo DB'
            }
          },
          {
            html:
              '<a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>',
            img: {
              src: '/',
              alt: 'Typescript'
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
          },
          {
            html:
              '<a href="https://bootstrap-vue.org/" target="_blank">BootstrapVue</a>',
            img: {
              src: '/',
              alt: 'BootstrapVue'
            }
          },
          {
            html: `Unit Test ${this.$t(
              'through'
            )} <a href="https://jestjs.io/" target="_blank">Jest</a> ${this.$t(
              'and'
            )} 
              <a href="https://vue-test-utils.vuejs.org/" target="_blank">Vue Test Utils</a>`,
            img: {
              src: '/',
              alt: 'Jest'
            }
          },
          {
            html:
              'Code formatter <a href="https://prettier.io/" target="_blank">Prettier</a>',
            img: {
              src: '/',
              alt: 'Prettier'
            }
          },
          {
            html:
              'Use Stylus as css preprocesor <a href="https://stylus-lang.com/" target="_blank">Stylus</a>',
            img: {
              src: '/',
              alt: 'Stylus'
            }
          },
          {
            html:
              'Use ES6 features: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">Optional chaining</a> <a href="https://github.com/pablocattaneo/what-can-i-cook-front-end-api-rest/blob/master/mixins/wc-handle-error.js" >For example</a>',
            img: {
              src: '/',
              alt: 'ES6'
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
