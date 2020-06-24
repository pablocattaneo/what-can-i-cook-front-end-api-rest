<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Login</h1>
      </div>
    </div>
    <div class="row">
      <WcForm class="col-12">
        <WcInput
          id="login-email"
          :value="loginForm.fields.email"
          :validation="$v.loginForm.fields.email"
          :label="$t('login.loginForm.fields.email') + ':'"
          :placeholder="$t('login.loginForm.fields.email')"
          :state="$v.loginForm.fields.email.$error ? false : null"
          @input="loginForm.fields.email = $event"
          type="email"
          class="w-100"
        />
        <WcInput
          id="login-password"
          :value="loginForm.fields.password"
          :validation="$v.loginForm.fields.password"
          :label="$t('login.loginForm.fields.password') + ':'"
          :placeholder="$t('login.loginForm.fields.password')"
          :state="$v.loginForm.fields.password.$error ? false : null"
          @input="loginForm.fields.password = $event"
          type="password"
          class="w-100"
        />
        <WcButtonSubmit
          @click.native="submit"
          :isProcessing="isFormProcessing"
        />
      </WcForm>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import wcFormMixin from '@/mixins/wc-form-mixin'
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
  mixins: [wcFormMixin, wcHandleError],
  data() {
    return {
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
    ...mapActions('user', ['userLoginAction']),
    async submit() {
      try {
        this.isFormProcessing = true
        await this.validationForm(this.$v)
        await this.userLoginAction(this.loginForm.fields)
        this.$router.push('/')
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
      }
    }
  }
}
</script>
