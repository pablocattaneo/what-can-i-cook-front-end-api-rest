<template>
  <div id="recipe-filters">
    <b-form-checkbox
      v-for="(language, index) in languagesData"
      :id="`language-${index}`"
      :key="`language-${index}`"
      v-model="language.isActive"
      v-b-tooltip.hover.top="language.isDisable ? $t('language_disable') : null"
      :disabled="language.isDisable"
      name="check-button"
      class="d-inline-block mr-4 mt-3"
      switch
      @change="$emit('languages-change', languagesData)"
    >
      {{ $t(language.text) }}
    </b-form-checkbox>
    <div class="mt-4">
      <label for="range-1">{{ $t('recipes.up_to_calories_by_portion') }}</label>
      <b-form-input
        id="range-1"
        v-model="portionCaloriesData"
        type="range"
        min="0"
        max="1000"
        @change="portionCaloriesChange"
      />
      <div>{{ $t('recipes.portion_calories') }}: {{ portionCaloriesData }}</div>
    </div>
    <WcSelect
      :options="categoryOptions"
      :label="$t('recipes.categories')"
      :value="categorySelected"
      class="mt-4"
      @input="categoryChange($event)"
    />
    <b-button class="mt-4" @click="$emit('clear-filter')">
      <BIconTrash2 />
      {{ $t('clear_filters') }}
    </b-button>
  </div>
</template>

<script>
import { BIconTrash2 } from 'bootstrap-vue'
import WcSelect from '@/components/forms/WcSelect'

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
    },
    categoryOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      languagesActivesCounter: 0,
      portionCaloriesData: this.portionCalories,
      languagesData: []
    }
  },
  created () {
    this.languagesData = [...this.languages]
    this.countActivesLanguages()
    this.activeOrDisableLanguageSection()
  },
  methods: {
    countActivesLanguages () {
      this.languages.forEach((language) => {
        if (language.isActive) {
          this.languagesActivesCounter++
        }
      })
    },
    activeOrDisableLanguageSection () {
      if (this.languagesActivesCounter === 1) {
        const activeLangueIndex = this.languagesData.findIndex(
          e => e.isActive === true
        )
        this.languagesData[activeLangueIndex].isDisable = true
      } else {
        this.languagesData.forEach((_, index) => {
          this.languagesData[index].isDisable = false
        })
      }
    },
    categoryChange (event) {
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
    portionCaloriesChange (event) {
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
