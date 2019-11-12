<template>
  <div id="wc-file">
    <b-form-group :id="id" :label="label" :for="id">
      <template v-slot:label>
        {{ label }}
        <span v-if="isARequiredFiled" class="text-danger">*</span>
      </template>
      <b-form-file
        :id="id"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :state="state"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        drop-placeholder="Drop file here..."
        @input="$emit('input', $event)"
      ></b-form-file>
      <b-form-invalid-feedback v-if="validation.required === false">
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
