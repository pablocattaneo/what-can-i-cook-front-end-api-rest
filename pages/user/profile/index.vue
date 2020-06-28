<template>
  <div id="page-profile" class="container">
    <h1>User profile</h1>
    <WcEditOneField
      :actualValue="user.userName"
      :wcInputValue="userForm.userName"
      :validation="$v.userForm.userName"
      @input="userForm.userName = $event"
      :endPointPath="endPointPath"
      :objectToSendServer="objectToSendServer"
    />
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
import { requiredIf, email } from 'vuelidate/lib/validators'
import wcHandleError from '@/mixins/wc-handle-error.js'
import WcEditOneField from '@/components/forms/WcEditOneField.vue'
export default {
  components: {
    WcEditOneField
  },
  mixins: [wcHandleError],
  data() {
    return {
      endPointPath: '',
      objectToSendServer: {
        userId: '',
        contentToUpdate: {
          userName: ''
        }
      },
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
  validations: {
    userForm: {
      name: {
        required: requiredIf(function() {
          return false
        })
      },
      lastName: {
        required: requiredIf(function() {
          return false
        })
      },
      email: {
        required: requiredIf(function() {
          return false
        }),
        email
      },
      userName: {
        required: requiredIf(function() {
          return false
        })
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
      this.endPointPath = `/user/update/${this.user.id}`
      this.objectToSendServer.userId = this.user.id
    } catch (error) {
      this.serverErrorsHandler(error)
    }
  }
}
</script>

<style></style>
