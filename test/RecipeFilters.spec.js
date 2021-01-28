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
