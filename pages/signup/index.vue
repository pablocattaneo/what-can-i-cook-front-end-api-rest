<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Sign Up</h1>
      </div>
    </div>
    <div class="row">
      <WcForm ref="form" class="col-12">
        <WcInput
          id="sign-up-name"
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
        <b-button @click="submit" type="submit" variant="primary"
          >Submit</b-button
        >
      </WcForm>
      <div class="row">
        <div class="col-12">
          <b-jumbotron
            header="BootstrapVue"
            lead="Bootstrap v4 Components for Vue.js 2"
          >
            <p>For more information visit website</p>
            <b-button variant="primary" href="#">More Info</b-button>
          </b-jumbotron>
        </div>
      </div>
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
      signUpForm: {
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
        }
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validationForm(this.$v)
        this.$axios.$put('/signup', this.signUpForm.fields)
      } catch (error) {
        console.log('Error in validation')
      }
    }
  }
}
</script>
