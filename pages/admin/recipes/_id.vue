<template>
  <div id="wc-page-admin-recipes" class="position-relative">
    <h1 class="text-center">
      {{ $t('recipes.create') }}
    </h1>
    <WcLoading v-if="isProcessingAuthentication" />
    <div v-if="!isProcessingAuthentication" class="page-content">
      <h1 class="text-center">
        {{ recipeForm.title }}
      </h1>
      <WcForm ref="wcForm">
        <div class="row">
          <WcInput
            id="recipe-name"
            :value="recipeForm.fields.title"
            :validation="$v.recipeForm.fields.title"
            :label="$t('recipes.form_title_label') + ':'"
            :placeholder="$t('recipes.form_title_label')"
            :state="$v.recipeForm.fields.title.$error ? false : null"
            class="col-12 mt-5 mt-md-4"
            autocomplete="off"
            autofocus
            @input="
              recipeForm.fields.title = $event
              getSlugFromTitle($event)
            "
          />
        </div>
        <div class="row">
          <WcTextArea
            id="recipe-description"
            :value="recipeForm.fields.description"
            :label="`${$t('recipes.form_description_label')}:`"
            class="col-12 mt-5"
            @input="recipeForm.fields.description = $event"
          />
        </div>
        <div class="row">
          <WcTextArea
            id="recipe-directions"
            :value="recipeForm.fields.directions"
            :validation="$v.recipeForm.fields.directions"
            :state="$v.recipeForm.fields.directions.$error ? false : null"
            :form-text-help-users="$t('recipes.form_directions_text_helps')"
            :label="`${$t('recipes.form_directions_label')}:`"
            class="col-12 mt-5"
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
        </div>
        <div class="row">
          <WcTextArea
            id="recipe-ingredients"
            :value="recipeForm.fields.ingredients"
            :validation="$v.recipeForm.fields.ingredients"
            :state="$v.recipeForm.fields.ingredients.$error ? false : null"
            :form-text-help-users="$t('recipes.form_ingredients_text_helps')"
            :label="`${$t('recipes.form_ingredients_label')}:`"
            class="col-12 mt-5"
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
        </div>
        <div class="row">
          <WcSelect
            :options="categoryOptions"
            :label="$t('recipes.categories')"
            :value="recipeForm.fields.category"
            :validation="$v.recipeForm.fields.category"
            :state="$v.recipeForm.fields.category.$error ? false : null"
            class="col-12 col-md-6 mt-5"
            @input="recipeForm.fields.category = $event"
          />
          <WcSelect
            :options="recipeLanguageOptions"
            :label="$t('recipes.select_recipe_language')"
            :value="recipeForm.fields.language"
            :validation="$v.recipeForm.fields.language"
            :state="$v.recipeForm.fields.language.$error ? false : null"
            class="col-12 col-md-6 mt-5"
            @input="recipeForm.fields.language = $event"
          />
        </div>
        <div class="row">
          <WcFile
            :label="$t('recipes.form_main_img_label')"
            :placeholder="$t('recipes.form_main_img_label')"
            class="col-12 mt-5"
            accept="image/*"
            @input="inputImg($event)"
          />
        </div>
        <div class="row">
          <b-img-lazy
            v-if="imgDOMStringOrImgUrl || recipeForm.fields.mainImg"
            :src="imgDOMStringOrImgUrl || recipeForm.fields.mainImg"
            :alt="recipeForm.fields.title"
            :title="recipeForm.fields.title"
            :blank-src="null"
            class="col-12 mw-100"
          />
        </div>
        <div class="row">
          <WcInput
            id="recipe-more-info-serving"
            :value="recipeForm.fields.moreInfo.serving"
            :validation="$v.recipeForm.fields.moreInfo.serving"
            :label="$t('recipes.form_more_info_serving_label') + ':'"
            :state="$v.recipeForm.fields.moreInfo.serving.$error ? false : null"
            class="col-12 col-md-6 mt-5"
            placeholder="4"
            type="number"
            @input="recipeForm.fields.moreInfo.serving = $event"
          />
          <WcInput
            id="recipe-more-info-cook-time"
            :value="recipeForm.fields.moreInfo.cookTime"
            :validation="$v.recipeForm.fields.moreInfo.cookTime"
            :label="$t('recipes.form_more_info_cook_time_label') + ':'"
            :state="
              $v.recipeForm.fields.moreInfo.cookTime.$error ? false : null
            "
            class="col-12 col-md-6 mt-5"
            placeholder="45"
            type="number"
            @input="recipeForm.fields.moreInfo.cookTime = $event"
          />
        </div>
        <div class="row">
          <WcInput
            id="recipe-more-info-ready-in"
            :value="recipeForm.fields.moreInfo.readyIn"
            :validation="$v.recipeForm.fields.moreInfo.readyIn"
            :label="$t('recipes.form_more_info_ready_in_label') + ':'"
            :state="$v.recipeForm.fields.moreInfo.readyIn.$error ? false : null"
            class="col-12 col-md-6 mt-5"
            placeholder="45"
            type="number"
            @input="recipeForm.fields.moreInfo.readyIn = $event"
          />
          <WcInput
            id="recipe-more-info-calories"
            :value="recipeForm.fields.moreInfo.calories"
            :validation="$v.recipeForm.fields.moreInfo.calories"
            :label="$t('recipes.form_more_info_calories_label') + ':'"
            :state="
              $v.recipeForm.fields.moreInfo.calories.$error ? false : null
            "
            class="col-12 col-md-6 mt-5"
            placeholder="120"
            type="number"
            @input="recipeForm.fields.moreInfo.calories = $event"
          />
        </div>
        <div class="row">
          <WcInput
            id="recipe-name"
            :value="recipeForm.fields.slug"
            :validation="$v.recipeForm.fields.slug"
            :label="$t('recipes.form_slug_label') + ':'"
            :placeholder="$t('recipes.form_slug_label')"
            :state="$v.recipeForm.fields.slug.$error ? false : null"
            class="col-12 mt-5"
            autocomplete="off"
            @input="recipeForm.fields.slug = $event"
          />
        </div>
        <WcButtonSubmit
          :is-processing="isFormProcessing"
          class="col-12 mt-5"
          @click.native="submit"
        />
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
  </div>
</template>

<script>
import { required, integer } from 'vuelidate/lib/validators'

import wcHandleError from '@/mixins/wc-handle-error.js'
import wcAuthenticationMixin from '@/mixins/wc-authentication-mixin.js'

import WcLoading from '@/components/WcLoading.vue'
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
    RecipeCard,
    WcLoading
  },
  mixins: [wcHandleError, wcAuthenticationMixin],
  async asyncData ({ params, app, store }) {
    function ingredientsArrayToString (array) {
      return array.toString().replace(/,/g, '\n')
    }
    function directionsArrayToString (array) {
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
          _id: params.id,
          author: null,
          title: recipe.title || '',
          description: recipe.description || '',
          ingredients: recipe.ingredients
            ? ingredientsArrayToString(recipe.ingredients)
            : null,
          directions: recipe.directions
            ? directionsArrayToString(recipe.directions)
            : null,
          category: recipe.category || '',
          language: recipe.language || '',
          mainImg: recipe.mainImg || null,
          moreInfo: {
            serving: recipe.more_info ? recipe.more_info.serving : null,
            cookTime: recipe.more_info ? recipe.more_info.cookTime : null,
            readyIn: recipe.more_info ? recipe.more_info.readyIn : null,
            calories: recipe.more_info ? recipe.more_info.calories : null
          },
          slug: recipe.slug || ''
        }
      }
    }
  },
  data () {
    return {
      isFormProcessing: false,
      storedRecipe: {
        data: '',
        message: ''
      },
      recipeId: this.$route.params.id || null,
      categoryOptions: [
        {
          value: null,
          text: this.$t('recipes.categories'),
          disabled: true
        },
        { value: 'appetizers-and-snacks', text: 'Appetizers & Snacks' },
        { value: 'breakfast-and-brunch', text: 'Breakfast & Brunch' },
        { value: 'desserts', text: 'Desserts' },
        { value: 'dinner', text: 'Dinner' },
        { value: 'drinks', text: 'Drinks' },
        { value: 'lunch', text: 'Lunch' }
      ],
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
    previewDirections () {
      return this.stringToArray(this.recipeForm.fields.directions)
    },
    previewIngredients () {
      return this.stringToArray(this.recipeForm.fields.ingredients)
    }
  },
  async mounted () {
    try {
      await this.authenticate()
      this.recipeForm.fields.author = this.$store.state.user.userId
    } catch (error) {
      this.serverErrorsHandler(error)
      this.$router.push(this.localePath('/login'))
    }
  },
  methods: {
    getSlugFromTitle (path) {
      const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]"
      for (let i = 0; i < urlReservedCharacters.length; i++) {
        path = path.replace(
          new RegExp('\\' + urlReservedCharacters[i], 'gi'),
          ''
        )
      }
      path = path.trim()
      path = path.toLowerCase()
      path = path.replace(/ /g, '-')
      path = path.replace(/á/gi, 'a')
      path = path.replace(/é/gi, 'e')
      path = path.replace(/í/gi, 'i')
      path = path.replace(/ó/gi, 'o')
      path = path.replace(/ú/gi, 'u')
      path = path.replace(/ñ/gi, 'n')
      this.recipeForm.fields.slug = path
    },
    stringToArray (string, regex = /[\n\r]/g) {
      return string ? string.split(regex) : null
    },
    inputImg (event) {
      this.recipeForm.fields.mainImg = event
      this.imgDOMStringOrImgUrl = URL.createObjectURL(event)
    },
    async submit () {
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
            `admin/recipes/editing/${this.recipeForm.fields._id}`,
            formData,
            { headers: { 'content-type': 'multipart/form-data' } }
          )
          this.$router.push(this.localePath('/recipes'))
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
        category: {
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
        },
        slug: {
          required,
          validPath: (value) => {
            const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]"
            for (let i = 0; i < urlReservedCharacters.length; i++) {
              if (value.includes(urlReservedCharacters[i])) {
                return false
              }
            }
            return true
          }
        }
      }
    }
  }
}
</script>
