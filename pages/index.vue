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
    <h2>Features</h2>
    <ul>
      <li>
        Inline edit fields:
        <nuxt-link to="/user/profile">User profile</nuxt-link>
      </li>
    </ul>
  </div>
</template>
