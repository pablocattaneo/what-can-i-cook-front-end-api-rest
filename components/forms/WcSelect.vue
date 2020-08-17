<template>
  <b-form-group :id="`label-${id}`" :label="label" :for="id">
    <template v-slot:label>
      {{ label }}
      <span v-if="isARequiredFiled" class="text-danger">*</span>
    </template>
    <b-form-select
      :value="selected"
      :options="options"
      :state="state"
      @input="$emit('input', $event)"
    />
    <b-form-invalid-feedback v-if="!validation.required">
      {{ $t('form.validation.required') }}
    </b-form-invalid-feedback>
    <b-form-text v-if="formTextHelpUsers">{{ formTextHelpUsers }}</b-form-text>
  </b-form-group>
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
      selected: this.value || null
    }
  }
}
</script>
