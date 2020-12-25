import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'

import RecipeCard from '@/components/recipes/RecipeCard'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()

let wrapper
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
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

describe('deleteRecipe method', () => {
  test('deleteRecipe method should be definded', () => {
    expect(wrapper.vm.deleteRecipe).toBeDefined()
  })
})

describe('Props id', () => {
  test('The component is well formed so prop id should exist', () => {
    expect(wrapper.vm).toHaveProperty('id')
  })
})

describe('Props title', () => {
  test('The component is well formed so prop title should exist', () => {
    expect(wrapper.vm).toHaveProperty('title')
  })
})

describe('Props bImgLazySrc', () => {
  test('The component is well formed so prop bImgLazySrc should exist', () => {
    expect(wrapper.vm).toHaveProperty('bImgLazySrc')
  })
})

describe('Props description', () => {
  test('The component is well formed so prop description should exist', () => {
    expect(wrapper.vm).toHaveProperty('description')
  })
})

describe('Props moreInfo', () => {
  test('The component is well formed so prop moreInfo should exist', () => {
    expect(wrapper.vm).toHaveProperty('moreInfo')
  })
})

describe('Props borderVariant', () => {
  test('The component is well formed so prop borderVariant should exist', () => {
    expect(wrapper.vm).toHaveProperty('borderVariant')
  })
})

describe('Props showCardHeader', () => {
  test('The component is well formed so prop showCardHeader should exist', () => {
    expect(wrapper.vm).toHaveProperty('showCardHeader')
  })
})
