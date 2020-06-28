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
        class="ml-2 icon wc-cursor-pointer"
        scale="1.2"
      />
    </p>

    <div class="row">
      <b-collapse id="user-name-collapse" class="col-12">
        <WcForm ref="wcForm" class="pl-2">
          <WcInput
            id="user-name"
            :value="userForm.userName"
            :validation="$v.userForm.userName"
            :label="$t('User_name') + ':'"
            :placeholder="$t('User_name')"
            :state="$v.userForm.userName.$error ? false : null"
            @input="userForm.userName = $event"
            type="text"
            class="w-100"
          />
          <b-button @click="closeEdit" variant="secondary">{{
            $t('Cancel')
          }}</b-button>
          <WcButtonSubmit
            @click.native="submit"
            :isProcessing="isFormProcessing"
          />
        </WcForm>
      </b-collapse>
    </div>

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
import { requiredIf, email } from 'vuelidate/lib/validators'
import wcHandleError from '@/mixins/wc-handle-error.js'
import WcInput from '@/components/forms/WcInput.vue'
import WcForm from '@/components/forms/WcForm.vue'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
export default {
  components: {
    BIconPencilSquare,
    WcInput,
    WcForm,
    WcButtonSubmit
  },
  mixins: [wcHandleError],
  data() {
    return {
      isFormProcessing: false,
      animation: null,
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
    } catch (error) {
      this.serverErrorsHandler(error)
    }
  },
  methods: {
    closeEdit() {
      this.$root.$emit('bv::toggle::collapse', 'user-name-collapse')
    },
    edit(field) {
      this.$root.$emit('bv::toggle::collapse', 'user-name-collapse')
      this.animation = 'throb'
      setTimeout(() => {
        this.animation = null
      }, 800)
    },
    async submit() {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        const objectToSendServer = {
          userId: this.user.id,
          contentToUpdate: {}
        }
        for (const key in this.userForm) {
          if (this.userForm[key]) {
            objectToSendServer.contentToUpdate[key] = this.userForm[key]
          }
        }
        await this.$axios.$post(
          `/user/update/${this.user.id}`,
          objectToSendServer,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
          }
        )
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
      }
    }
  }
}
</script>

<style></style>
