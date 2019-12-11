<template>
  <div>
    <nuxt-link :to="localePath({ path: '/about' })">{{
      $t('links.about')
    }}</nuxt-link>
    <nuxt-link :to="localePath({ path: '/recipes' })">{{
      $t('links.recipes')
    }}</nuxt-link>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    <nuxt />
  </div>
</template>
