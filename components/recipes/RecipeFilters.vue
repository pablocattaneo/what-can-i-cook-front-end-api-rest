<template>
  <div>
    <b-form-group>
      <template v-slot:label>
        <b>{{ $t('language') }}</b
        ><br />
        <b-form-checkbox
          v-model="allSelected"
          @change="toggleAll"
          aria-describedby="flavours"
          aria-controls="flavours"
        >
          {{
            allSelected
              ? $t('un_select_all_less_default_language')
              : $t('select_all')
          }}
        </b-form-checkbox>
      </template>

      <b-form-checkbox-group
        id="flavors"
        v-model="selected"
        :options="flavours"
        name="flavors"
        class="ml-4"
        aria-label="Individual flavours"
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flavours: [this.$t('es'), this.$t('en')],
      selected: [this.$t(this.$i18n.locale)],
      allSelected: false
    }
  },
  watch: {
    selected(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.allSelected = false
        this.selected.push(this.$t(this.$i18n.locale))
      } else if (newVal.length === this.flavours.length) {
        this.allSelected = true
        this.$router.push({
          query: { language: 'all' }
        })
      }
    }
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.flavours.slice() : []
    }
  }
}
</script>
