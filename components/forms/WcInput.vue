<template>
  <div id="wc-input">
    <b-form-group :id="`label-${id}`" :label="label" :for="id">
      <template #label>
        {{ label }}
        <span v-if="isARequiredFiled" class="text-danger">*</span>
      </template>
      <b-form-input
        :id="id"
        ref="bFormInput"
        :value="value"
        :placeholder="placeholder"
        :state="state"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :type="type"
        @input="$emit('input', $event)"
      />
      <b-form-invalid-feedback v-if="validation.required === false">
        {{ $t('form.validation.required') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.integer === false">
        {{ $t('form.validation.integerNumber') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.email === false">
        {{ $t('form.validation.email') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.minLength === false">
        {{ $t('form.validation.minLength') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.sameAs === false">
        {{ $t('form.validation.sameAs') }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="validation.validPath === false">
        {{ $t('form.validation.validPath') }}
      </b-form-invalid-feedback>
      <b-form-text v-if="formTextHelpUsers">
        {{
          formTextHelpUsers
        }}
      </b-form-text>
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
  },
  methods: {
    focus () {
      this.$nextTick(() => {
        this.$refs.bFormInput.focus()
      })
    }
  }
}
</script>
