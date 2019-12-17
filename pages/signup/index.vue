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
          id="login-name"
          :value="loginForm.fields.name"
          :validation="$v.loginForm.fields.name"
          :label="$t('login.loginForm.fields.name') + ':'"
          :placeholder="$t('login.loginForm.fields.name')"
          :state="$v.loginForm.fields.name.$error ? false : null"
          @input="loginForm.fields.name = $event"
          autocomplete="off"
          autofocus
          class="w-100"
        />
        <WcInput
          id="login-lastname"
          :value="loginForm.fields.lastName"
          :validation="$v.loginForm.fields.lastName"
          :label="$t('login.loginForm.fields.lastName') + ':'"
          :placeholder="$t('login.loginForm.fields.lastName')"
          :state="$v.loginForm.fields.lastName.$error ? false : null"
          @input="loginForm.fields.lastName = $event"
          autocomplete="off"
          class="w-100"
        />
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
        <b-button @click="submit" type="submit" variant="primary"
          >Submit</b-button
        >
      </WcForm>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
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
          name: '',
          lastName: '',
          email: '',
          userName: '',
          password: ''
        }
      }
    }
  },
  validations: {
    loginForm: {
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
