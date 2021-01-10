import { mutations } from '@/store/recipes.js'

test('resetRecipes ', () => {
  const state = {
    recipes: [
      {
        _id: '1',
        author: '12',
        title: 'sarasa',
        description: 'Foo',
        mainImg: 'images/url',
        slug: 'sarasa'
      }
    ],
    totalRecipes: 1
  }
  mutations.resetRecipes(state)
  expect(state).toEqual({
    recipes: [],
    totalRecipes: 0
  })
})
