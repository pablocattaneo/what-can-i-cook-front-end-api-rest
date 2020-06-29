<template>
  <div id="page-profile" class="container">
    <div class="row">
      <div class="col-12">
        <h1>User profile</h1>
      </div>
    </div>
    <WcEditInlineField
      id="user-username"
      :labels="$t('User_name')"
      :actualValue="user.userName"
      @updated="getUser"
      :endPointPath="endPointPath"
      :objectToSendServer="{
        userId: user.id,
        contentToUpdate: {
          userName: ''
        }
      }"
    />
    <WcEditInlineField
      id="user-name"
      :labels="$t('Name')"
      :actualValue="user.name"
      @updated="getUser"
      :endPointPath="endPointPath"
      :objectToSendServer="{
        userId: user.id,
        contentToUpdate: {
          name: ''
        }
      }"
    />
    <WcEditInlineField
      id="user-lastname"
      :labels="$t('Last_name')"
      :actualValue="user.lastName"
      @updated="getUser"
      :endPointPath="endPointPath"
      :objectToSendServer="{
        userId: user.id,
        contentToUpdate: {
          lastName: ''
        }
      }"
    />
    <WcEditInlineField
      id="user-email"
      :labels="$t('Email')"
      :actualValue="user.email"
      @updated="getUser"
      :endPointPath="endPointPath"
      :objectToSendServer="{
        userId: user.id,
        contentToUpdate: {
          email: ''
        }
      }"
    />
  </div>
</template>

<script>
import wcHandleError from '@/mixins/wc-handle-error.js'
import WcEditInlineField from '@/components/forms/WcEditInlineField.vue'
export default {
  components: {
    WcEditInlineField
  },
  mixins: [wcHandleError],
  data() {
    return {
      endPointPath: '',
      userForm: {
        name: '',
        lastName: '',
        email: '',
        userName: ''
      },
      user: {
        id: '',
        userName: '',
        name: '',
        lastName: '',
        email: ''
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
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
        this.endPointPath = `/user/update/${this.user.id}`
      } catch (error) {
        this.serverErrorsHandler(error)
      }
    }
  }
}
</script>
