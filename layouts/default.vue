<template>
  <div>
    <nuxt-link :to="localePath('about')">{{ $t('links.about') }}</nuxt-link>
    <nuxt-link :to="localePath('recipes')">{{ $t('links.recipes') }}</nuxt-link>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    <nuxt />
  </div>
</template>
