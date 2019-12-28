export default ({ app, route }, inject) => {
  inject('getRecipes', () => {
    const currentLang = app.i18n.locale
    const urlLangSantized = route.fullPath.replace(`/${currentLang}`, '')
    return app.$axios.$get(urlLangSantized, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplbGVuYUBtYWlsaW5hdG9yLm5ldCIsInVzZXJJZCI6IjVkZmUyZDdlYmNlYTE3MGNjNzAyZGZkZiIsImlhdCI6MTU3NzAxOTgxNCwiZXhwIjoxNTc3MDIzNDE0fQ.SMDNJh5Wcu-sovQIlwScnjmAIHi65mdLAbiehL17Au4'
      }
    })
  })
}
