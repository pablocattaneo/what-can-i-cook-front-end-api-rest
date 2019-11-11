<template>
  <div>
    <b-form-group :id="id" :label="label" :for="id">
      <b-form-select
        :value="selected"
        :options="options"
        @input="$emit('input', $event)"
      ></b-form-select>
    </b-form-group>
  </div>
</template>

<script>
import wcFormElementsMixin from '@/mixins/wc-form-elements-mixin'
export default {
  mixins: [wcFormElementsMixin],
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.value ? this.value : null
    }
  }
}
</script>
