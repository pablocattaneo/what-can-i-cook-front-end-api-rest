<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Login</h1>
      </div>
    </div>
    <div class="row">
      <WcForm ref="form" class="col-12">
        <WcInput
          id="login-username"
          :value="loginForm.fields.userName"
          :validation="$v.loginForm.fields.userName"
          :label="$t('login.loginForm.fields.userName') + ':'"
          :placeholder="$t('login.loginForm.fields.userName')"
          :state="$v.loginForm.fields.userName.$error ? false : null"
          @input="loginForm.fields.userName = $event"
          autocomplete="off"
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
        <b-button @click="submit" type="submit" variant="primary">{{
          $t('form.submit')
        }}</b-button>
      </WcForm>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WcForm from '@/components/forms/WcForm'
import WcInput from '@/components/forms/WcInput'
export default {
  components: {
    WcForm,
    WcInput
  },
  data() {
    return {
      loginForm: {
        fields: {
          userName: '',
          password: ''
        }
      }
    }
  },
  validations: {
    loginForm: {
      fields: {
        userName: {
          required
        },
        password: {
          required
        }
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validationForm(this.$v)
        this.storedRecipe = await this.$axios.$put(
          '/signup',
          this.loginForm.fields
        )
      } catch (error) {
        console.log('Error in validation')
      }
    }
  }
}
</script>
