export default ({ app, route }, inject) => {
  inject('getRecipes', () => {
    const currentLang = app.i18n.locale
    const urlLangSantized = route.fullPath.replace(`/${currentLang}`, '')
    return app.$axios.$get(urlLangSantized)
  })
}
