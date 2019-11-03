<template>
  <div id="wc-textarea">
    <b-form-textarea
      :id="id"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :state="state"
      :autocomplete="autocomplete"
      rows="3"
      max-rows="6"
      @input="$emit('input', $event)"
    ></b-form-textarea>
    <b-form-invalid-feedback v-if="!validation.required">
      {{ $t('form.validation.required') }}
    </b-form-invalid-feedback>
  </div>
</template>

<script>
import wcFormElementsMixin from '@/mixins/wc-form-elements-mixin'
export default {
  mixins: [wcFormElementsMixin]
}
</script>

<style></style>
