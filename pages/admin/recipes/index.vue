<template>
  <div id="admin-recipes">
    <b-form
      novalidate
      :validated="recipeForm.wasFormValidated"
      @submit.prevent="submit"
      @reset="resetForm"
    >
      <b-form-group
        id="recipe-name"
        label="Recipe name:"
        label-for="recipe-name"
        invalid-feedback="invalidFeedback"
        valid-feedback="validFeedback"
      >
        <b-form-input
          id="recipe-name"
          v-model="recipeForm.fields.recipeName"
          required
          placeholder="Recipe name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      recipeForm: {
        fields: {
          recipeName: ''
        },
        wasFormValidated: false
      }
    }
  },
  methods: {
    submit() {
      this.recipeForm.wasFormValidated = true
      this.$v.recipeForm.$touch()
      if (!this.$v.recipeForm.$pending && !this.$v.recipeForm.$error) {
        alert(JSON.stringify(this.recipeForm.fields))
      } else {
        alert('Error in validation')
      }
    },
    resetForm() {
      alert('reset')
    }
  },
  validations: {
    recipeForm: {
      fields: {
        recipeName: {
          required
        }
      }
    }
  }
}
</script>

<style></style>
