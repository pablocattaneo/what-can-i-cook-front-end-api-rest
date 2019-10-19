<template>
  <div>
    <nuxt-link :to="localePath('about')">{{ $t('links.about') }}</nuxt-link>
    <nuxt-link :to="localePath('about', 'es')">About en español</nuxt-link>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    <!-- <nuxt-link
      :to="
        localePath({ name: 'category-slug', params: { slug: category.slug } })
      "
    >
      {{ category.title }}
    </nuxt-link> -->
    <nuxt />
  </div>
</template>
