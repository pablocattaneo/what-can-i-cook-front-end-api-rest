<template>
  <div id="page-profile" class="container">
    <h1>User profile</h1>
    <p>
      <span class="font-weight-bold">{{ $t('User_name') }}:</span>
      <span>{{ user.userName }}</span>
      <b-icon-pencil-square
        @click="edit"
        :animation="animation"
        variant="primary"
        class="ml-2"
        scale="1.2"
      />
    </p>
    <p>
      <span class="font-weight-bold">{{ $t('Name') }}:</span>
      <span>{{ user.name }}</span>
    </p>
    <p>
      <span class="font-weight-bold">{{ $t('Last_name') }}:</span>
      <span>{{ user.lastName }}</span>
    </p>
    <p>
      <span class="font-weight-bold">{{ $t('Email') }}:</span>
      <span>{{ user.email }}</span>
    </p>
  </div>
</template>

<script>
import { BIconPencilSquare } from 'bootstrap-vue'
import wcHandleError from '@/mixins/wc-handle-error.js'
export default {
  components: {
    BIconPencilSquare
  },
  mixins: [wcHandleError],
  data() {
    return {
      animation: null,
      user: {
        id: '',
        userName: '',
        name: '',
        lastName: '',
        email: ''
      }
    }
  },
  async mounted() {
    try {
      this.$store.dispatch('user/getUserData')
      const userDataGotFromServe = await this.$axios.$get(
        `user/${this.$store.state.user.userId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }
      )
      this.user.id = userDataGotFromServe._id
      this.user.userName = userDataGotFromServe.userName
      this.user.name = userDataGotFromServe.name
      this.user.lastName = userDataGotFromServe.lastName
      this.user.email = userDataGotFromServe.email
    } catch (error) {
      this.serverErrorsHandler(error)
    }
  },
  methods: {
    edit(field) {
      this.animation = 'throb'
      setTimeout(() => {
        this.animation = false
      }, 800)
    }
  }
}
</script>

<style></style>
