<template>
  <b-navbar
    id="wc-header"
    :sticky="true"
    toggleable="lg"
    type="dark"
    variant="primary"
  >
    <b-navbar-brand :to="localePath({ path: '/' })">
      <b-img-lazy
        :blank-src="null"
        src="~/assets/img/logo.svg"
        alt="site logo"
        title="site logo"
        class="logo-img"
      />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav class="justify-content-between">
      <b-navbar-nav>
        <b-nav-item :to="localePath({ path: '/recipes' })">{{
          $t('links.recipes')
        }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="flex-grow-06">
        <b-nav-form @submit.stop.prevent class="flex-grow-1 b-nav-form">
          <b-input-group size="sm" class="flex-grow-1">
            <b-form-input
              v-model="term"
              :placeholder="$t('Search')"
              size="sm"
              class="flex-grow-1"
              autofocus
            />
            <b-input-group-append>
              <b-button @click="searchMethod" size="sm" type="submit">
                <BIconSearch class="mr-1" />
                {{ $t('Search') }}
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item :to="switchLocalePath('en')"> EN</b-dropdown-item>
          <b-dropdown-item :to="switchLocalePath('es')"> ES</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ $t('links.user') }}</em>
          </template>
          <b-dropdown-item
            v-if="isUserLogged"
            :to="localePath({ path: '/user/profile' })"
          >
            <BIconPersonCircle class="mr-1" />
            {{ $t('links.profile') }}</b-dropdown-item
          >
          <b-dropdown-item
            v-if="!isUserLogged"
            :to="localePath({ path: '/login' })"
          >
            <BIconBoxArrowInRight class="mr-1" />
            Login</b-dropdown-item
          >
          <b-dropdown-item v-if="isUserLogged" @click="signOut">
            <BIconBoxArrowRight class="mr-1" />
            {{ $t('links.sign_out') }}</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item :to="localePath({ path: '/signup' })">
          {{ $t('links.sign_up') }}</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

import {
  BIconSearch,
  BIconPersonCircle,
  BIconBoxArrowRight,
  BIconBoxArrowInRight
} from 'bootstrap-vue'

export default {
  components: {
    BIconSearch,
    BIconPersonCircle,
    BIconBoxArrowRight,
    BIconBoxArrowInRight
  },
  data() {
    return {
      term: ''
    }
  },
  computed: {
    ...mapState('user', ['isUserLogged'])
  },
  methods: {
    searchMethod() {
      this.$router.push({
        path: this.localePath('/recipes'),
        query: {
          ...this.$route.query,
          term: this.term
        }
      })
    },
    async signOut() {
      await this.$store.dispatch('user/userSignOutAction')
      this.$router.push(this.localePath('/login'))
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo-img
  max-width 30px
  position relative
  top -2px
.flex-grow-06
  flex-grow 0.6
::v-deep
  .b-nav-form
    form
      flex-grow 1
</style>
