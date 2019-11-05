<template>
  <div id="admin-recipes">
    <WcForm>
      <WcInput
        id="recipe-name"
        :value="recipeForm.fields.recipeTitle"
        :validation="$v.recipeForm.fields.recipeTitle"
        :label="$t('recipes.form_title_label') + ':'"
        :placeholder="$t('recipes.form_title_label')"
        :state="$v.recipeForm.fields.recipeTitle.$error ? false : null"
        autocomplete="off"
        autofocus
        @input="recipeForm.fields.recipeTitle = $event"
      />
      <WcTextArea
        id="recipe-ingredients"
        :value="recipeForm.fields.recipeIngredients"
        :validation="$v.recipeForm.fields.recipeIngredients"
        :form-text-help-users="$t('recipes.form_ingredients_text_helps')"
        :label="`${$t('recipes.form_ingredients_label')}:`"
        placeholder="Recipe ingredients"
        :state="$v.recipeForm.fields.recipeIngredients.$error ? false : null"
        autocomplete="off"
        @input="recipeForm.fields.recipeIngredients = $event"
      />
      <div
        v-if="recipeForm.fields.recipeIngredients"
        class="preview-ingredients"
      >
        <h1>{{ $t('recipes.preview_ingredients') }}</h1>
        <ul>
          <li
            v-for="(ingredient, index) in previewIngredients"
            :key="'ingredient-' + index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
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
import wcFormUtilitiesMixin from '@/mixins/wc-form-utilities-mixin'
export default {
  components: {
    WcInput,
    WcForm,
    WcTextArea
  },
  mixins: [wcFormUtilitiesMixin],
  data() {
    return {
      previewIngredients: [],
      recipeForm: {
        fields: {
          recipeTitle: null,
          recipeIngredients: null
        }
      }
    }
  },
  watch: {
    'recipeForm.fields.recipeIngredients'() {
      this.previewIngredients = this.stringToArray(
        this.recipeForm.fields.recipeIngredients
      )
    }
  },
  methods: {
    async submit() {
      try {
        await this.$children[0].validationForm(this.$v)
        const saveRecipe = await this.$axios.$post('/recipes/create-recipe', this.recipeForm.fields)
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
