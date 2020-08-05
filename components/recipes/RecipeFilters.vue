<template>
  <div id="eecipe-filters">
    <b-form-checkbox v-model="spanish" name="check-button" switch>
      {{ $t('es') }}
    </b-form-checkbox>
    <b-form-checkbox v-model="english" name="check-button" switch>
      {{ $t('en') }}
    </b-form-checkbox>
    <div>
      <label for="range-1">{{ $t('recipes.up_to_calories_by_portion') }}</label>
      <b-form-input
        id="range-1"
        v-model="portionCalories"
        @change="portionCaloriesChange"
        type="range"
        min="0"
        max="1000"
      />
      <div class="mt-2">
        {{ $t('recipes.portion_calories') }}: {{ portionCalories }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spanish: false,
      english: false,
      urlArray: [],
      portionCalories: null
    }
  },
  watch: {
    spanish() {
      this.buildLanguageQueryString(this.spanish, 'es')
    },
    english() {
      this.buildLanguageQueryString(this.english, 'en')
    }
  },
  methods: {
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
