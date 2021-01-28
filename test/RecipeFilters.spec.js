import { shallowMount, createLocalVue } from '@vue/test-utils'
import RecipeFilters from '@/components/recipes/RecipeFilters'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeEach(() => {
  wrapper = shallowMount(RecipeFilters, {
    localVue,
    mocks: {
      $t() {}
    }
  })
})

test('Sanity test', () => {
  expect(true).toBe(true)
})

describe('Snapshots', () => {
  test('Branch: default. It verify if non-intentional changes were made.', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('Props', () => {
  test('The component is well formed so prop languages should exist', () => {
    expect(wrapper.props()).toHaveProperty('languages')
  })
  test('The component is well formed so prop categorySlected should exist', () => {
    expect(wrapper.props()).toHaveProperty('categorySlected')
  })
  test('The component is well formed so prop portionCalories should exist', () => {
    expect(wrapper.props()).toHaveProperty('portionCalories')
  })
})
