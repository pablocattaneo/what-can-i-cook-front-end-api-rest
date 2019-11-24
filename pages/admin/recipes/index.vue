<template>
  <div id="admin-recipes">
    <WcForm>
      <WcInput
        id="recipe-name"
        :value="recipeForm.fields.title"
        :validation="$v.recipeForm.fields.title"
        :label="$t('recipes.form_title_label') + ':'"
        :placeholder="$t('recipes.form_title_label')"
        :state="$v.recipeForm.fields.title.$error ? false : null"
        autocomplete="off"
        autofocus
        @input="recipeForm.fields.title = $event"
      />
      <WcTextArea
        id="recipe-directions"
        :value="recipeForm.fields.directions"
        :validation="$v.recipeForm.fields.directions"
        :state="$v.recipeForm.fields.directions.$error ? false : null"
        :form-text-help-users="$t('recipes.form_directions_text_helps')"
        :label="`${$t('recipes.form_directions_label')}:`"
        placeholder="Recipe directions"
        autocomplete="off"
        @input="recipeForm.fields.directions = $event"
      />
      <div v-if="recipeForm.fields.directions" class="preview-directions">
        <h1>{{ $t('recipes.preview_directions') }}</h1>
        <ol>
          <li
            v-for="(ingredient, index) in previewDirections"
            :key="'ingredient-' + index"
          >
            {{ ingredient }}
          </li>
        </ol>
      </div>
      <WcTextArea
        id="recipe-ingredients"
        :value="recipeForm.fields.ingredients"
        :validation="$v.recipeForm.fields.ingredients"
        :state="$v.recipeForm.fields.ingredients.$error ? false : null"
        :form-text-help-users="$t('recipes.form_ingredients_text_helps')"
        :label="`${$t('recipes.form_ingredients_label')}:`"
        placeholder="Recipe ingredients"
        autocomplete="off"
        @input="recipeForm.fields.ingredients = $event"
      />
      <div v-if="recipeForm.fields.ingredients" class="preview-ingredients">
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
      <WcSelect
        :options="recipeLanguageOptions"
        :label="$t('recipes.select_recipe_language')"
        :value="recipeForm.fields.language"
        :validation="$v.recipeForm.fields.language"
        :state="$v.recipeForm.fields.language.$error ? false : null"
        @input="recipeForm.fields.language = $event"
      />
      <WcFile
        :label="$t('recipes.form_main_img_label')"
        :placeholder="$t('recipes.form_main_img_label')"
        @input="recipeForm.fields.mainImage = $event"
      />
      <b-button type="submit" variant="primary" @click="submit"
        >Submit</b-button
      >
    </WcForm>
    <b-modal
      id="storedRecipe"
      :title="storedRecipe.message"
      header-bg-variant="success"
      header-text-variant="light"
    >
      <RecipeCard
        :title="storedRecipe.data.title"
        :b-img-lazy-src="
          $store.state.apiRestBaseUrl + storedRecipe.data.mainImg
        "
        :description="storedRecipe.data.description"
        :more-info="storedRecipe.data.more_info"
        :directions="storedRecipe.data.directions"
      />
    </b-modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WcForm from '@/components/forms/WcForm'
import WcInput from '@/components/forms/WcInput'
import WcSelect from '@/components/forms/WcSelect'
import WcTextArea from '@/components/forms/WcTextArea'
import WcFile from '@/components/forms/WcFile'
import wcFormUtilitiesMixin from '@/mixins/wc-form-utilities-mixin'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
export default {
  components: {
    WcForm,
    WcInput,
    WcSelect,
    WcTextArea,
    WcFile,
    RecipeCard
  },
  mixins: [wcFormUtilitiesMixin],
  data() {
    return {
      previewIngredients: [],
      previewDirections: [],
      storedRecipe: {
        data: '',
        message: ''
      },
      recipeLanguageOptions: [
        {
          value: null,
          text: this.$t('recipes.select_recipe_language'),
          disabled: true
        },
        { value: 'en', text: 'English' },
        { value: 'es', text: 'Spanish' }
      ],
      recipeForm: {
        fields: {
          title: null,
          ingredients: null,
          directions: null,
          language: null,
          mainImage: null
        }
      }
    }
  },
  watch: {
    'recipeForm.fields.ingredients'() {
      this.previewIngredients = this.stringToArray(
        this.recipeForm.fields.ingredients
      )
    },
    'recipeForm.fields.directions'() {
      this.previewDirections = this.stringToArray(
        this.recipeForm.fields.directions
      )
    }
  },
  methods: {
    async submit() {
      try {
        await this.$children[0].validationForm(this.$v)
        const formData = new FormData()
        for (const key of Object.keys(this.recipeForm.fields)) {
          formData.append(key, this.recipeForm.fields[key])
        }
        this.storedRecipe = await this.$axios.$post(
          '/recipes/create-recipe',
          formData,
          { headers: { 'content-type': 'multipart/form-data' } }
        )
        console.log('this.storedRecipe', this.storedRecipe)
        this.$bvModal.show('storedRecipe')
      } catch (error) {
        alert('Error in validation')
      }
    }
  },
  validations: {
    recipeForm: {
      fields: {
        title: {
          required
        },
        ingredients: {
          required
        },
        directions: {
          required
        },
        language: {
          required
        }
      }
    }
  }
}
</script>
