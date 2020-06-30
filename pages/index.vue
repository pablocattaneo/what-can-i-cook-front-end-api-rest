<template>
  <div class="container">
    <h1 class="Content__Title">
      {{ $t('home.title') }}
    </h1>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <b-avatar
          src="@/assets/img/pablo-cattaneo.jpg"
          size="175px"
          alt="Pablo Cattaneo"
        />
      </div>
    </div>
    <p class="mt-4">{{ $t('home.introduction') }}</p>
    <h2>Techonologies apply</h2>
    <h3>Front End</h3>
    <ul>
      <li>
        First Server Side Rendering using:
        <a href="https://nuxtjs.org/" target="_blank">Nuxt</a>
      </li>
      <li>
        <a href="https://bootstrap-vue.org/" target="_blank">BootstrapVue</a>
      </li>
      <li>
        Code formatter
        <a href="https://prettier.io/" target="_blank">Prettier</a>
      </li>
    </ul>
    <h3>Backend End</h3>
    <ul>
      <li><a href="https://nodejs.org/en/" target="_blank">Node</a></li>
      <li><a href="https://expressjs.com/" target="_blank">Express</a></li>
      <li><a href="https://www.mongodb.com/" target="_blank">MongoDB</a></li>
    </ul>
    <h2>Features</h2>
    <ul>
      <li>
        Locale to English and Spanish
      </li>
      <li>
        Authentication via JWT
      </li>
      <li>
        Inline edit fields:
        <nuxt-link to="/user/profile">User profile</nuxt-link>
      </li>
      <li>
        Handle Erros
      </li>
    </ul>
  </div>
</template>
