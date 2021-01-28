import { mount, createLocalVue } from '@vue/test-utils'
import RecipeFilters from '@/components/recipes/RecipeFilters'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

let wrapper
beforeEach(() => {
  wrapper = mount(RecipeFilters, {
    localVue,
    mocks: {
      $t() {}
    },
    propsData: {
      languages: [
        { isActive: true, text: 'es', isDisable: true },
        { isActive: false, text: 'en', isDisable: false }
      ]
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
  test('The props languages was set to [{"isActive":true,"text":"es","isDisable":true},{"isActive":false,"text":"en","isDisable":false}] so #language-0 and #language-1 elements should be render.', async () => {
    await wrapper.setProps({
      languages: [
        { isActive: true, text: 'es', isDisable: true },
        { isActive: false, text: 'en', isDisable: false }
      ]
    })
    expect(wrapper.findAll('#language-0, #language-1')).toHaveLength(2)
  })
  test('The component is well formed so prop categorySelected should exist', () => {
    expect(wrapper.props()).toHaveProperty('categorySelected')
  })
  test('The component is well formed so prop portionCalories should exist', () => {
    expect(wrapper.props()).toHaveProperty('portionCalories')
  })
})
