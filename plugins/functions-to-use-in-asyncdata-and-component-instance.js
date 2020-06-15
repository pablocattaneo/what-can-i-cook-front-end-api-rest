export default ({ app, route }, inject) => {
  inject('getRecipes', () => {
    const currentLang = app.i18n.locale
    const urlLangSantized = route.fullPath.replace(`/${currentLang}`, '')
    console.log('urlLangSantized', urlLangSantized)
    return app.$axios.$get('recipes/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBjYXR0YW5lb0BnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZTQyNzZkZTdhM2M5YjI1YmM4NzM5M2IiLCJpYXQiOjE1ODE0MTQ1NzksImV4cCI6MTU4MTQxODE3OX0.16wf7CiWm43DXz8CE6Mi92l7CIN-PW1mGyL-vvIEsjQ'
      }
    })
  })
}
