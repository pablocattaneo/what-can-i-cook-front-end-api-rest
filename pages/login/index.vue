<template>
  <div id="wc-page-login">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">
          Login
        </h1>
      </div>
    </div>
    <b-jumbotron
      header-level="6"
      bg-variant="info"
      header="User demo"
      class="mt-5 mb-3"
    >
      <p><b>User email:</b> user-demo@gmail.com</p>
      <p><b>User password:</b> 1234</p>
    </b-jumbotron>
    <WcForm ref="wcForm">
      <div class="row">
        <WcInput
          id="login-email"
          :value="loginForm.fields.email"
          :validation="$v.loginForm.fields.email"
          :label="$t('login.loginForm.fields.email') + ':'"
          :placeholder="$t('login.loginForm.fields.email')"
          :state="$v.loginForm.fields.email.$error ? false : null"
          type="email"
          class="col-12 col-md-6 mt-4"
          @input="loginForm.fields.email = $event"
        />
        <WcInput
          id="login-password"
          :value="loginForm.fields.password"
          :validation="$v.loginForm.fields.password"
          :label="$t('login.loginForm.fields.password') + ':'"
          :placeholder="$t('login.loginForm.fields.password')"
          :state="$v.loginForm.fields.password.$error ? false : null"
          type="password"
          class="col-12 col-md-6 mt-4"
          @input="loginForm.fields.password = $event"
        />
      </div>
      <WcButtonSubmit
        :button-text-value="$t('Log_in')"
        :is-processing="isFormProcessing"
        class="w-100 mt-3"
        @click.native="submit"
      />
    </WcForm>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

import wcHandleError from '@/mixins/wc-handle-error.js'

import WcForm from '@/components/forms/WcForm'
import WcInput from '@/components/forms/WcInput'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
export default {
  components: {
    WcForm,
    WcInput,
    WcButtonSubmit
  },
  mixins: [wcHandleError],
  data () {
    return {
      isFormProcessing: false,
      loginForm: {
        fields: {
          email: '',
          password: ''
        }
      }
    }
  },
  validations: {
    loginForm: {
      fields: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    }
  },
  methods: {
    async submit () {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        await this.$store.dispatch(
          'user/userLoginAction',
          this.loginForm.fields
        )
        this.$router.push('user/profile')
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
      }
    }
  }
}
</script>
