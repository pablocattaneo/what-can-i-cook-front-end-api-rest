<template>
  <b-button
    :disabled="disabled || isProcessing"
    type="submit"
    variant="primary"
  >
    <b-spinner v-if="isProcessing" small type="grow" />
    <template v-if="isProcessing">
      {{ processingTextValue || $t('form.processing') }}
    </template>
    <template v-if="!isProcessing">
      {{ buttonTextValue || $t('form.submit') }}
    </template>
  </b-button>
</template>

<script>
export default {
  props: {
    isProcessing: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonTextValue: {
      type: String,
      default: ''
    },
    processingTextValue: {
      type: String,
      default: ''
    }
  }
}
</script>
