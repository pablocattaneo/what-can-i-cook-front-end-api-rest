<template>
  <div id="admin-recipes">
    <b-form novalidate @submit.prevent="submit" @reset="resetForm">
      <b-form-group
        id="recipe-name"
        label="Recipe name:"
        label-for="recipe-name"
      >
        <b-form-input
          id="recipe-name"
          v-model="recipeForm.fields.recipeName"
          placeholder="Recipe name"
          :state="$v.recipeForm.fields.recipeName.$error ? false : null"
        ></b-form-input>
        <b-form-invalid-feedback
          v-if="!$v.recipeForm.fields.recipeName.required"
        >
          {{ $t('form.validation.required') }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-input list="my-list-id"></b-form-input>
      <datalist id="my-list-id">
        <option>Ingredients</option>
        <option
          v-for="(ingredient, index) in ingredients"
          :key="`ingredients-${index}`"
          >{{ ingredient }}</option
        >
      </datalist>
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
      ingredients: ['Arroz', 'Leche', 'Dulce de leche'],
      recipeForm: {
        fields: {
          recipeName: null
        }
      }
    }
  },
  methods: {
    fieldState(fieldValue, validation) {
      if (fieldValue === null) {
        return null
      } else if (fieldValue && !validation) {
        return true
      } else {
        return false
      }
    },
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
