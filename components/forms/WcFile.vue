<template>
  <b-form-group :id="`label-${id}`" :label="label" :for="id">
    <template #label>
      {{ label }}
      <span v-if="isARequiredFiled" class="text-danger">*</span>
    </template>
    <b-form-file
      :id="id"
      v-model="file"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :browse-text="buttonTextValue"
      :placeholder="placeholder"
      :state="state"
      :accept="accept"
      drop-placeholder="Drop file here..."
      @input="change()"
    >
      <template slot="file-name" slot-scope="{ names }">
        <b-badge variant="dark">
          {{ names[0] }}
        </b-badge>
      </template>
    </b-form-file>
    <b-button size="sm" class="mt-2" @click="file = null">
      Reset
    </b-button>
    <b-form-invalid-feedback v-if="validation.required === false">
      {{ $t('form.validation.required') }}
    </b-form-invalid-feedback>
    <b-form-text v-if="formTextHelpUsers">
      {{ formTextHelpUsers }}
    </b-form-text>
  </b-form-group>
</template>

<script>
import wcFormElementsMixin from '@/mixins/wc-form-elements-mixin'
export default {
  mixins: [wcFormElementsMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    buttonTextValue: {
      type: String,
      default: 'Browse'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    change () {
      this.$emit('input', this.file)
    }
  }
}
</script>
