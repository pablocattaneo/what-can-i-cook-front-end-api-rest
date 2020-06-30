<template>
  <div id="admin-recipes" class="container">
    <h1>{{ recipeForm.title }}</h1>
    <WcForm ref="wcForm">
      <WcInput
        id="recipe-name"
        :value="recipeForm.fields.title"
        :validation="$v.recipeForm.fields.title"
        :label="$t('recipes.form_title_label') + ':'"
        :placeholder="$t('recipes.form_title_label')"
        :state="$v.recipeForm.fields.title.$error ? false : null"
        @input="recipeForm.fields.title = $event"
        autocomplete="off"
        autofocus
      />
      <WcTextArea
        id="recipe-description"
        :value="recipeForm.fields.description"
        :label="`${$t('recipes.form_description_label')}:`"
        @input="recipeForm.fields.description = $event"
      />
      <WcTextArea
        id="recipe-directions"
        :value="recipeForm.fields.directions"
        :validation="$v.recipeForm.fields.directions"
        :state="$v.recipeForm.fields.directions.$error ? false : null"
        :form-text-help-users="$t('recipes.form_directions_text_helps')"
        :label="`${$t('recipes.form_directions_label')}:`"
        @input="recipeForm.fields.directions = $event"
        placeholder="Recipe directions"
        autocomplete="off"
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
        @input="recipeForm.fields.ingredients = $event"
        placeholder="Recipe ingredients"
        autocomplete="off"
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
        @input="inputImg($event)"
      />
      <b-img-lazy
        v-if="imgDOMStringOrImgUrl || recipeForm.fields.mainImg"
        :src="imgDOMStringOrImgUrl || recipeForm.fields.mainImg"
        :alt="recipeForm.fields.title"
        :title="recipeForm.fields.title"
        :blank-src="null"
        class="mw-100"
      />
      <WcInput
        id="recipe-more-info-serving"
        :value="recipeForm.fields.moreInfo.serving"
        :validation="$v.recipeForm.fields.moreInfo.serving"
        :label="$t('recipes.form_more_info_serving_label') + ':'"
        :state="$v.recipeForm.fields.moreInfo.serving.$error ? false : null"
        @input="recipeForm.fields.moreInfo.serving = $event"
        placeholder="4"
        type="number"
      />
      <WcInput
        id="recipe-more-info-cook-time"
        :value="recipeForm.fields.moreInfo.cookTime"
        :validation="$v.recipeForm.fields.moreInfo.cookTime"
        :label="$t('recipes.form_more_info_cook_time_label') + ':'"
        :state="$v.recipeForm.fields.moreInfo.cookTime.$error ? false : null"
        @input="recipeForm.fields.moreInfo.cookTime = $event"
        placeholder="45"
        type="number"
      />
      <WcInput
        id="recipe-more-info-ready-in"
        :value="recipeForm.fields.moreInfo.readyIn"
        :validation="$v.recipeForm.fields.moreInfo.readyIn"
        :label="$t('recipes.form_more_info_ready_in_label') + ':'"
        :state="$v.recipeForm.fields.moreInfo.readyIn.$error ? false : null"
        @input="recipeForm.fields.moreInfo.readyIn = $event"
        placeholder="45"
        type="number"
      />
      <WcInput
        id="recipe-more-info-calories"
        :value="recipeForm.fields.moreInfo.calories"
        :validation="$v.recipeForm.fields.moreInfo.calories"
        :label="$t('recipes.form_more_info_calories_label') + ':'"
        :state="$v.recipeForm.fields.moreInfo.calories.$error ? false : null"
        @input="recipeForm.fields.moreInfo.calories = $event"
        placeholder="120"
        type="number"
      />
      <WcButtonSubmit @click.native="submit" :isProcessing="isFormProcessing" />
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
          storedRecipe.data.mainImg
            ? $store.state.apiRestBaseUrl + storedRecipe.data.mainImg
            : null
        "
        :description="storedRecipe.data.description"
        :more-info="storedRecipe.data.more_info"
        :directions="storedRecipe.data.directions"
      />
    </b-modal>
  </div>
</template>

<script>
import { required, integer } from 'vuelidate/lib/validators'

import wcHandleError from '@/mixins/wc-handle-error.js'

import WcForm from '@/components/forms/WcForm'
import WcInput from '@/components/forms/WcInput'
import WcSelect from '@/components/forms/WcSelect'
import WcTextArea from '@/components/forms/WcTextArea'
import WcFile from '@/components/forms/WcFile'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
export default {
  components: {
    WcForm,
    WcInput,
    WcSelect,
    WcTextArea,
    WcFile,
    WcButtonSubmit,
    RecipeCard
  },
  mixins: [wcHandleError],
  data() {
    return {
      isFormProcessing: false,
      storedRecipe: {
        data: '',
        message: ''
      },
      recipeId: this.$route.params.id || null,
      recipeLanguageOptions: [
        {
          value: null,
          text: this.$t('recipes.select_recipe_language'),
          disabled: true
        },
        { value: 'en', text: 'English' },
        { value: 'es', text: 'Spanish' }
      ]
    }
  },
  computed: {
    previewIngredients() {
      return this.$nextTick(() =>
        this.$refs.wcForm.stringToArray(this.recipeForm.fields.ingredients)
      )
    },
    previewDirections() {
      return this.$nextTick(() =>
        this.$refs.wcForm.stringToArray(this.recipeForm.fields.directions)
      )
    }
  },
  async asyncData({ params, app, store }) {
    function ingredientsArrayToString(array) {
      return array.toString().replace(/,/g, '\n')
    }
    function directionsArrayToString(array) {
      return array.join('\r')
    }
    const recipeId = params.id
    const recipe = recipeId ? await app.$axios.$get(`/recipe/${recipeId}`) : {}
    return {
      imgDOMStringOrImgUrl: recipe.mainImg
        ? store.state.apiRestBaseUrl + recipe.mainImg
        : '',
      recipeForm: {
        isOnEditMode: !!params.id,
        fields: {
          title: recipe.title || '',
          description: recipe.description || '',
          ingredients: recipe.ingredients
            ? ingredientsArrayToString(recipe.ingredients)
            : null,
          directions: recipe.directions
            ? directionsArrayToString(recipe.directions)
            : null,
          language: recipe.language || '',
          mainImage: recipe.mainImg || null,
          moreInfo: {
            serving: recipe.more_info ? recipe.more_info.serving : null,
            cookTime: recipe.more_info ? recipe.more_info.cookTime : null,
            readyIn: recipe.more_info ? recipe.more_info.readyIn : null,
            calories: recipe.more_info ? recipe.more_info.calories : null
          }
        }
      }
    }
  },
  methods: {
    inputImg(event) {
      this.recipeForm.fields.mainImage = event
      this.imgDOMStringOrImgUrl = URL.createObjectURL(event)
    },
    async submit() {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        const formData = new FormData()
        for (const key of Object.keys(this.recipeForm.fields)) {
          let value = this.recipeForm.fields[key]
          const isAFile = value instanceof Blob
          if (
            typeof value === 'object' &&
            value !== null &&
            isAFile === false
          ) {
            value = JSON.stringify(value)
          }
          formData.append(key, value)
        }
        if (this.recipeForm.isOnEditMode === false) {
          this.storedRecipe = await this.$axios.$post(
            '/recipes/create-recipe',
            formData,
            { headers: { 'content-type': 'multipart/form-data' } }
          )
        }
        if (this.recipeForm.isOnEditMode) {
          this.storedRecipe = await this.$axios.$put(
            'admin/recipes/editing/5de655dcd269d2821b2c73f9',
            formData,
            { headers: { 'content-type': 'multipart/form-data' } }
          )
        }
        this.$bvModal.show('storedRecipe')
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
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
        },
        moreInfo: {
          serving: {
            integer
          },
          cookTime: {
            integer
          },
          readyIn: {
            integer
          },
          calories: {
            integer
          }
        }
      }
    }
  }
}
</script>
