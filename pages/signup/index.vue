<template>
  <div id="wc-page-signup-index">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">
          Sign Up
        </h1>
      </div>
    </div>
    <WcForm ref="wcForm" class="row">
      <div
        class="col-12 col-md-6 justify-content-center align-items-center d-md-flex flex-column mt-4 d-none"
      >
        <h2>{{ $t('What_can_i_cook') }}</h2>
        <h3>{{ $t('Sign_up_and_find_answer') }}</h3>
        <b-img-lazy
          :blank-src="null"
          src="~/assets/img/logo.svg"
          alt="site logo"
          title="site logo"
          class="logo-img mt-4"
        />
      </div>
      <div class="col-12 col-md-6 mt-2 mt-md-0">
        <WcInput
          id="sign-up-name"
          :value="signUpForm.fields.name"
          :validation="$v.signUpForm.fields.name"
          :label="$t('signUp.signUpForm.fields.name') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.name')"
          :state="$v.signUpForm.fields.name.$error ? false : null"
          autocomplete="off"
          autofocus
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.name = $event"
        />
        <WcInput
          id="sign-up-lastname"
          :value="signUpForm.fields.lastName"
          :validation="$v.signUpForm.fields.lastName"
          :label="$t('signUp.signUpForm.fields.lastName') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.lastName')"
          :state="$v.signUpForm.fields.lastName.$error ? false : null"
          autocomplete="off"
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.lastName = $event"
        />
        <WcInput
          id="sign-up-username"
          :value="signUpForm.fields.userName"
          :validation="$v.signUpForm.fields.userName"
          :label="$t('signUp.signUpForm.fields.userName') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.userName')"
          :state="$v.signUpForm.fields.userName.$error ? false : null"
          autocomplete="off"
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.userName = $event"
        />
        <WcInput
          id="sign-up-email"
          :value="signUpForm.fields.email"
          :validation="$v.signUpForm.fields.email"
          :label="$t('signUp.signUpForm.fields.email') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.email')"
          :state="$v.signUpForm.fields.email.$error ? false : null"
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.email = $event"
        />
        <WcInput
          id="sign-up-password"
          :value="signUpForm.fields.password"
          :validation="$v.signUpForm.fields.password"
          :label="$t('signUp.signUpForm.fields.password') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.password')"
          :state="$v.signUpForm.fields.password.$error ? false : null"
          type="password"
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.password = $event"
        />
        <WcInput
          id="sign-up-repeat-password"
          :value="signUpForm.fields.confirmPassword"
          :validation="$v.signUpForm.fields.confirmPassword"
          :label="$t('signUp.signUpForm.fields.confirmPassword') + ':'"
          :placeholder="$t('signUp.signUpForm.fields.confirmPassword')"
          :state="$v.signUpForm.fields.confirmPassword.$error ? false : null"
          type="password"
          class="w-100 mt-5 mt-md-4"
          @input="signUpForm.fields.confirmPassword = $event"
        />
        <WcButtonSubmit
          :button-text-value="$t('Sign_up')"
          :is-processing="isFormProcessing"
          class="w-100 mt-4 mt-md-3"
          @click.native="submit"
        />
      </div>
    </WcForm>
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
  data () {
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
    async submit () {
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

<style lang="stylus" scoped>
.logo-img
  max-height 200px
</style>
