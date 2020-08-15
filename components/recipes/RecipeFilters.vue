<template>
  <div id="eecipe-filters">
    <b-form-checkbox v-model="languages.spanish" name="check-button" switch>
      {{ $t('es') }}
    </b-form-checkbox>
    <b-form-checkbox v-model="languages.english" name="check-button" switch>
      {{ $t('en') }}
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
    languagesStatus: {
      type: Object,
      default: () => ({
        languages: {
          spanish: false,
          english: false
        }
      })
    }
  },
  data() {
    return {
      languages: {
        spanish: false,
        english: false
      },
      urlArray: [],
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
  watch: {
    languagesStatus() {
      this.setLanguages()
    },
    languages: {
      handler() {
        this.$emit('languagesChange', this.languages)
      },
      deep: true
    }
    // 'languages.spanish'() {
    //   this.buildLanguageQueryString(this.languages.spanish, 'es')
    // },
    // 'languages.english'() {
    //   this.buildLanguageQueryString(this.languages.english, 'en')
    // }
  },
  created() {
    this.setLanguages()
  },
  methods: {
    setLanguages() {
      this.languages = this.languagesStatus
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
    },
    buildLanguageQueryString(language, value) {
      if (language) {
        this.urlArray.push({ language: value })
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            ...this.$route.query,
            filters: JSON.stringify(this.urlArray)
          }
        })
      } else {
        const index = this.urlArray.findIndex((e) => e.language === value)
        this.urlArray.splice(index, 1)
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            ...this.$route.query,
            filters: JSON.stringify(this.urlArray.length ? this.urlArray : [{}])
          }
        })
      }
    }
  }
}
</script>
