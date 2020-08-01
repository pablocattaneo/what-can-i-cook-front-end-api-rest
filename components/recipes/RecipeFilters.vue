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
      if (this.spanish) {
        this.urlArray.push({ language: 'es' })
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            filters: JSON.stringify(this.urlArray)
          }
        })
      }
    },
    english() {
      if (this.spanish) {
        this.urlArray.push({ language: 'en' })
        this.$router.push({
          path: this.localePath('/recipes'),
          query: {
            filters: JSON.stringify(this.urlArray)
          }
        })
      }
    }
  }
}
</script>
