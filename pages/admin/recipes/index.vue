<template>
  <div id="admin-recipes">
    <WcForm>
      <WcInput
        id="recipe-name"
        :value="recipeForm.fields.recipeTitle"
        :validation="$v.recipeForm.fields.recipeTitle"
        label="Recipe name:"
        label-for="recipe-name"
        placeholder="Recipe name"
        :state="$v.recipeForm.fields.recipeTitle.$error ? false : null"
        autocomplete="off"
        @input="recipeForm.fields.recipeTitle = $event"
      />
      <WcTextArea
        id="recipe-ingredients"
        :value="recipeForm.fields.recipeIngredients"
        :validation="$v.recipeForm.fields.recipeIngredients"
        label="Recipe name:"
        label-for="recipe-ingredients"
        placeholder="Recipe ingredients"
        :state="$v.recipeForm.fields.recipeIngredients.$error ? false : null"
        autocomplete="off"
        @input="recipeForm.fields.recipeIngredients = $event"
      />
      <b-button type="submit" variant="primary" @click="submit"
        >Submit</b-button
      >
    </WcForm>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WcForm from '@/components/forms/WcForm'
import WcInput from '@/components/forms/WcInput'
import WcTextArea from '@/components/forms/WcTextArea'
export default {
  components: {
    WcInput,
    WcForm,
    WcTextArea
  },
  data() {
    return {
      ingredients: ['Arroz', 'Leche', 'Dulce de leche'],
      recipeForm: {
        fields: {
          recipeTitle: null,
          recipeIngredients: null
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
        recipeTitle: {
          required
        },
        recipeIngredients: {
          required
        }
      }
    }
  }
}
</script>
