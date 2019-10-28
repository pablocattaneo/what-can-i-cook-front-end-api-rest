<template>
  <div id="admin-recipes">
    <b-form novalidate @submit.prevent="submit" @reset="resetForm">
      <WcInput
        id="recipe-name"
        v-model="recipeForm.fields.recipeName"
        :validation="$v.recipeForm.fields.recipeName"
        label="Recipe name:"
        label-for="recipe-name"
        placeholder="Recipe name"
        :state="$v.recipeForm.fields.recipeName.$error ? false : null"
        autocomplete="off"
      />
      <!-- <b-form-input list="my-list-id"></b-form-input>
      <datalist id="my-list-id">
        <option>Ingredients</option>
        <option
          v-for="(ingredient, index) in ingredients"
          :key="`ingredients-${index}`"
          >{{ ingredient }}</option
        >
      </datalist> -->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WcInput from '@/components/forms/WcInput'
export default {
  components: {
    WcInput
  },
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
