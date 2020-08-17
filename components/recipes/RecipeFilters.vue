<template>
  <div id="eecipe-filters">
    <b-form-checkbox
      :key="`language-${index}`"
      v-for="(language, index) in languagesData"
      v-model="language.isActive"
      @change="changeLanguage"
      :disabled="language.isDisable"
      name="check-button"
      switch
    >
      {{ $t(language.text) }}
    </b-form-checkbox>
    <div class="mt-4">
      <label for="range-1">{{ $t('recipes.up_to_calories_by_portion') }}</label>
      <b-form-input
        id="range-1"
        v-model="portionCalories"
        @change="portionCaloriesChange"
        type="range"
        min="0"
        max="1000"
      />
      <div>{{ $t('recipes.portion_calories') }}: {{ portionCalories }}</div>
    </div>
    <WcSelect
      :options="categoryOptions"
      :label="$t('recipes.categories')"
      @input="categoryChange($event)"
      class="mt-4"
    />
  </div>
</template>

<script>
import WcSelect from '@/components/forms/WcSelect'

export default {
  components: {
    WcSelect
  },
  props: {
    languages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      languagesData: this.languages,
      languagesActivesCounter: 0,
      portionCalories: 1000,
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
      ]
    }
  },
  created() {
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
      this.$router.push({
        path: this.localePath('/recipes'),
        query: {
          ...this.$route.query,
          category: event
        }
      })
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
