<template>
  <div id="wc-input">
    <b-form-group :id="id" :label="label" :label-for="labelFor">
      <b-form-input
        :value="value"
        @input="$emit('input', $event)"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :state="state"
        :autocomplete="autocomplete"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!validation.required">
        {{ $t('form.validation.required') }}
      </b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
import wcFormElementsMixin from '@/mixins/wc-form-elements-mixin'
export default {
  mixins: [wcFormElementsMixin]
}
</script>
