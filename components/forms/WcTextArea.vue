<template>
  <div id="wc-textarea">
    <b-form-group :id="`label-${id}`" :label="label" :for="id">
      <template v-slot:label>
        {{ label }}
        <span v-if="isARequiredFiled" class="text-danger">*</span>
      </template>
      <b-form-textarea
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :state="state"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @input="$emit('input', $event)"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
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
  mixins: [wcFormElementsMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
