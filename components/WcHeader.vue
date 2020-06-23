<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="localePath({ path: '/about' })">{{
            $t('links.about')
          }}</b-nav-item>
          <b-nav-item :to="localePath({ path: '/recipes' })">{{
            $t('links.recipes')
          }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item :to="switchLocalePath('en')">EN</b-dropdown-item>
            <b-dropdown-item :to="switchLocalePath('es')">ES</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item to="/user/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-if="!isUserLogged" to="/login"
              >Login</b-dropdown-item
            >
            <b-dropdown-item v-if="isUserLogged" @click="signOut" to="/login"
              >Sign out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['isUserLogged'])
  },
  methods: {
    ...mapMutations('user', ['isUserLoggedMutation']),
    signOut() {
      this.isUserLoggedMutation(false)
    }
  }
}
</script>
