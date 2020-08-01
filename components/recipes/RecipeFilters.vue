<template>
  <div id="eecipe-filters">
    <b-form-checkbox v-model="spanish" name="check-button" switch>
      {{ $t('es') }}
    </b-form-checkbox>
    <b-form-checkbox v-model="english" name="check-button" switch>
      {{ $t('en') }}
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spanish: false,
      english: false,
      urlArray: []
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
    buildLanguageQueryString(language, value) {
      if (language) {
        this.urlArray.push({ language: value })
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            filters: JSON.stringify(this.urlArray)
          }
        })
      } else {
        const index = this.urlArray.findIndex((e) => e.language === value)
        this.urlArray.splice(index, 1)
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            filters: JSON.stringify(this.urlArray.length ? this.urlArray : [{}])
          }
        })
      }
    }
  }
}
</script>
