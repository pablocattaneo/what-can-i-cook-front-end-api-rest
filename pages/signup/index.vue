<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Sign Up</h1>
      </div>
    </div>
    <div class="row">
      <WcForm class="col-12">
        <WcInput
          id="sign-up-name"
          ref="wcForm"
          :value="signUpForm.fields.name"
          :validation="$v.signUpForm.fields.name"
          :label="$t('signUp.signUpForm.fields.name') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.name')"
          :state="$v.signUpForm.fields.name.$error ? false : null"
          @input="signUpForm.fields.name = $event"
          autocomplete="off"
          autofocus
          class="w-100"
        />
        <WcInput
          id="sign-up-lastname"
          :value="signUpForm.fields.lastName"
          :validation="$v.signUpForm.fields.lastName"
          :label="$t('signUp.signUpForm.fields.lastName') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.lastName')"
          :state="$v.signUpForm.fields.lastName.$error ? false : null"
          @input="signUpForm.fields.lastName = $event"
          autocomplete="off"
          class="w-100"
        />
        <WcInput
          id="sign-up-email"
          :value="signUpForm.fields.email"
          :validation="$v.signUpForm.fields.email"
          :label="$t('signUp.signUpForm.fields.email') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.email')"
          :state="$v.signUpForm.fields.email.$error ? false : null"
          @input="signUpForm.fields.email = $event"
          type="email"
          class="w-100"
        />
        <WcInput
          id="sign-up-username"
          :value="signUpForm.fields.userName"
          :validation="$v.signUpForm.fields.userName"
          :label="$t('signUp.signUpForm.fields.userName') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.userName')"
          :state="$v.signUpForm.fields.userName.$error ? false : null"
          @input="signUpForm.fields.userName = $event"
          autocomplete="off"
          class="w-100"
        />
        <WcInput
          id="sign-up-password"
          :value="signUpForm.fields.password"
          :validation="$v.signUpForm.fields.password"
          :label="$t('signUp.signUpForm.fields.password') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.password')"
          :state="$v.signUpForm.fields.password.$error ? false : null"
          @input="signUpForm.fields.password = $event"
          type="password"
          class="w-100"
        />
        <WcInput
          id="sign-up-repeat-password"
          :value="signUpForm.fields.confirmPassword"
          :validation="$v.signUpForm.fields.confirmPassword"
          :label="$t('signUp.signUpForm.fields.confirmPassword') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.confirmPassword')"
          :state="$v.signUpForm.fields.confirmPassword.$error ? false : null"
          @input="signUpForm.fields.confirmPassword = $event"
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
import { required, email, sameAs } from 'vuelidate/lib/validators'

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
  data() {
    return {
      isFormProcessing: false,
      signUpForm: {
        fields: {
          name: '',
          lastName: '',
          email: '',
          userName: '',
          password: '',
          confirmPassword: ''
        }
      }
    }
  },
  validations: {
    signUpForm: {
      fields: {
        name: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        userName: {
          required
        },
        password: {
          required
        },
        confirmPassword: {
          required,
          sameAs: sameAs('password')
        }
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        await this.$axios.$put('/signup', this.signUpForm.fields)
        this.$router.push('/login')
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
      }
    }
  }
}
</script>
