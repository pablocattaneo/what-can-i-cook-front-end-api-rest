import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'

import RecipeCard from '@/components/recipes/RecipeCard'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeEach(() => {
  localVue.use(BootstrapVue)
  wrapper = shallowMount(RecipeCard, {
    localVue,
    mocks: {
      $t: () => {},
      localePath: () => ''
    },
    stubs: {
      'n-link': RouterLinkStub
    },
    propsData: {
      readMoreLink: '/',
      bImgLazySrc: '/'
    }
  })
})

describe('Snaphots', () => {
  test('Branch: Default. It verify if non-intentional changes were made.', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('deleteRecipe method', () => {
  test('deleteRecipe method should be definded', () => {
    expect(wrapper.vm.deleteRecipe).toBeDefined()
  })
})

describe('Props', () => {
  test('The component is well formed so prop id should exist', () => {
    expect(wrapper.props()).toHaveProperty('id')
  })

  test('The component is well formed so prop title should exist', () => {
    expect(wrapper.props()).toHaveProperty('title')
  })

  test('The component is well formed so prop bImgLazySrc should exist', () => {
    expect(wrapper.props()).toHaveProperty('bImgLazySrc')
  })

  test('The component is well formed so prop description should exist', () => {
    expect(wrapper.props()).toHaveProperty('description')
  })

  test('The component is well formed so prop moreInfo should exist', () => {
    expect(wrapper.props()).toHaveProperty('moreInfo')
  })

  test('The component is well formed so prop borderVariant should exist', () => {
    expect(wrapper.props()).toHaveProperty('borderVariant')
  })

  test('The component is well formed so prop showCardHeader should exist', () => {
    expect(wrapper.props()).toHaveProperty('showCardHeader')
  })
})
