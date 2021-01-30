import { mount, createLocalVue } from '@vue/test-utils'
import RecipeFilters from '@/components/recipes/RecipeFilters'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
const mountOptionsForAllComponents = {
  localVue,
  mocks: {
    $t() {}
  }
}

let wrapper
beforeEach(() => {
  wrapper = mount(RecipeFilters, {
    ...mountOptionsForAllComponents,
    propsData: {
      languages: [
        {
          isActive: true,
          text: 'es',
          isDisable: false
        },
        {
          isActive: true,
          text: 'en',
          isDisable: false
        }
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
  test('The props languages was set to [{"isActive":true,"text":"es","isDisable":false},{"isActive":true,"text":"en","isDisable":false}] so #language-0 and #language-1 elements should be render.', () => {
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(2)
  })
  test('The first element of languaes has property isDisable set to true, the element #language-0 shold has disabled attribute set to disabled', () => {
    wrapper = mount(RecipeFilters, {
      ...mountOptionsForAllComponents,
      propsData: {
        languages: [
          { isActive: false, text: 'es', isDisable: false },
          { isActive: true, text: 'en', isDisable: true }
        ]
      }
    })
    const checkbox = wrapper.find('#language-1')
    expect(checkbox.attributes('disabled')).toBe('disabled')
  })
  test('The component is well formed so prop categorySelected should exist', () => {
    expect(wrapper.props()).toHaveProperty('categorySelected')
  })
  test('The props categorySelected was set to "food" so ', () => {
    wrapper = mount(RecipeFilters, {
      ...mountOptionsForAllComponents,
      propsData: {
        languages: [
          { isActive: false, text: 'es', isDisable: false },
          { isActive: true, text: 'en', isDisable: true }
        ],
        categorySelected: 'desserts',
        categoryOptions: [
          {
            value: null,
            text: 'categories'
          },
          { value: 'desserts', text: 'Desserts' },
          { value: 'lunch', text: 'Lunch' }
        ]
      }
    })
    expect(wrapper.find('select').element.value).toBe('desserts')
  })
  test('The component is well formed so prop portionCalories should exist', () => {
    expect(wrapper.props()).toHaveProperty('portionCalories')
  })
})

describe('Events', () => {
  test('The first element of languaes has property isDisable set to false, the element #language-0 trigger change event so languages-change event should be trigger with languages as payload', async () => {
    const checkbox = await wrapper.find('#language-0')
    await checkbox.trigger('change')
    expect(wrapper.emitted('languages-change')).toHaveLength(1)
    expect(wrapper.emitted('languages-change')[0]).toEqual([
      wrapper.vm.$props.languages
    ])
  })
})
