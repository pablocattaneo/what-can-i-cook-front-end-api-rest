export default ({ app, route }, inject) => {
  inject('getRecipes', () => {
    return app.$axios.$get('recipes/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
      }
    })
  })
}
