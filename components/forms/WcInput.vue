<template>
  <div id="wc-input">
    <b-form-group :id="`label-${id}`" :label="label" :for="id">
      <template v-slot:label>
        {{ label }}
        <span v-if="isARequiredFiled" class="text-danger">*</span>
      </template>
      <b-form-input
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :state="state"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :type="type"
        @input="$emit('input', $event)"
      ></b-form-input>
      <b-form-invalid-feedback v-if="validation.required === false">
        {{ $t('form.validation.required') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.integer === false">
        {{ $t('form.validation.integerNumber') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.email === false">
        {{ $t('form.validation.email') }}
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
  mixins: [wcFormElementsMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
