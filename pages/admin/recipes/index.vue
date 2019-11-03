<template>
  <div id="admin-recipes">
    <WcForm>
      <WcInput
        id="recipe-name"
        :value="recipeForm.fields.recipeName"
        @input="recipeForm.fields.recipeName = $event"
        :validation="$v.recipeForm.fields.recipeName"
        label="Recipe name:"
        label-for="recipe-name"
        placeholder="Recipe name"
        :state="$v.recipeForm.fields.recipeName.$error ? false : null"
        autocomplete="off"
      />
      <b-button type="submit" variant="primary" @click="submit"
        >Submit</b-button
      >
    </WcForm>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WcInput from '@/components/forms/WcInput'
import WcForm from '@/components/forms/WcForm'
export default {
  components: {
    WcInput,
    WcForm
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
    async submit() {
      try {
        await this.$children[0].validationForm(this.$v)
        alert(JSON.stringify(this.recipeForm.fields))
      } catch (error) {
        alert('Error in validation')
      }
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
