<template>
  <div id="wc-input">
    <b-form-group :id="id" :label="label" :for="id">
      <b-form-input
        :id="id"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :state="state"
        :autocomplete="autocomplete"
        @input="$emit('input', $event)"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!validation.required">
        {{ $t('form.validation.required') }}
      </b-form-invalid-feedback>
      <b-form-text v-if="formTextHelpUsers">{{
        formTextHelpUsers
      }}</b-form-text>
    </b-form-group>
  </div>
</template>

<script>
import wcFormElementsMixin from '@/mixins/wc-form-elements-mixin'
export default {
  mixins: [wcFormElementsMixin]
}
</script>
