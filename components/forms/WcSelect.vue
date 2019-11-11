<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      @input="$emit('input', $event)"
    ></b-form-select>
    <div class="mt-3">
      Selected: <strong>{{ selected }}</strong>
    </div>
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
