<template>
  <div id="recipe-filters">
    <b-form-checkbox
      :id="`language-${index}`"
      :key="`language-${index}`"
      v-for="(language, index) in languagesData"
      v-model="language.isActive"
      @change="changeLanguage"
      :disabled="language.isDisable"
      v-b-tooltip.hover.top="language.isDisable ? $t('language_disable') : null"
      name="check-button"
      class="d-inline-block mr-4 mt-3"
      switch
    >
      {{ $t(language.text) }}
    </b-form-checkbox>
    <div class="mt-4">
      <label for="range-1">{{ $t('recipes.up_to_calories_by_portion') }}</label>
      <b-form-input
        id="range-1"
        v-model="portionCaloriesData"
        @change="portionCaloriesChange"
        type="range"
        min="0"
        max="1000"
      />
      <div>{{ $t('recipes.portion_calories') }}: {{ portionCaloriesData }}</div>
    </div>
    <WcSelect
      :options="categoryOptions"
      :label="$t('recipes.categories')"
      @input="categoryChange($event)"
      :value="categorySelected"
      class="mt-4"
    />
    <b-button @click="$emit('clear-filter')" class="mt-4">
      <BIconTrash2 />
      {{ $t('clear_filters') }}</b-button
    >
  </div>
</template>

<script>
import WcSelect from '@/components/forms/WcSelect'
import { BIconTrash2 } from 'bootstrap-vue'

export default {
  components: {
    WcSelect,
    BIconTrash2
  },
  props: {
    languages: {
      type: Array,
      default: () => []
    },
    categorySelected: {
      type: String,
      default: ''
    },
    portionCalories: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      languagesData: [],
      languagesActivesCounter: 0,
      portionCaloriesData: this.portionCalories,
      categoryOptions: [
        {
          value: null,
          text: this.$t('recipes.categories')
        },
        { value: 'appetizers-and-snacks', text: 'Appetizers & Snacks' },
        { value: 'breakfast-and-brunch', text: 'Breakfast & Brunch' },
        { value: 'desserts', text: 'Desserts' },
        { value: 'dinner', text: 'Dinner' },
        { value: 'drinks', text: 'Drinks' },
        { value: 'lunch', text: 'Lunch' }
      ]
    }
  },
  created() {
    this.languagesData = this.languages
    this.countActivesLanguages()
    this.activeOrDisableLanguageSection()
  },
  methods: {
    countActivesLanguages() {
      this.languages.forEach((language) => {
        if (language.isActive) {
          this.languagesActivesCounter++
        }
      })
    },
    activeOrDisableLanguageSection() {
      if (this.languagesActivesCounter === 1) {
        const activeLangueIndex = this.languages.findIndex(
          (e) => e.isActive === true
        )
        this.languages[activeLangueIndex].isDisable = true
      } else {
        this.languages.forEach((language, index) => {
          this.languages[index].isDisable = false
        })
      }
    },
    changeLanguage() {
      this.$nextTick(() => {
        this.$emit('languages-change', this.languagesData)
      })
    },
    categoryChange(event) {
      if (event) {
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            ...this.$route.query,
            category: event
          }
        })
      } else {
        const query = { ...this.$route.query }
        delete query.category
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            ...query
          }
        })
      }
    },
    portionCaloriesChange(event) {
      this.$router.push({
        path: this.localePath('/recipes'),
        query: {
          ...this.$route.query,
          calories: event
        }
      })
    }
  }
}
</script>
