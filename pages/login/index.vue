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
          id="recipe-name"
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
        <b-button @click="submit" type="submit" variant="primary"
          >Submit</b-button
        >
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
          name: '',
          lastName: '',
          email: '',
          username: ''
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
          required
        },
        username: {
          required
        }
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validationForm(this.$v)
        console.log('validation')
      } catch (error) {
        alert('Error in validation')
      }
    }
  }
}
</script>
