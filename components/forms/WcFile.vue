<template>
  <div id="wc-file">
    <b-form-group :id="id" :label="label" :for="id">
      <template v-slot:label>
        {{ label }}
        <span v-if="isARequiredFiled" class="text-danger">*</span>
      </template>
      <b-form-file
        :id="id"
        v-model="file"
        :placeholder="placeholder"
        :state="state"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        drop-placeholder="Drop file here..."
        :browse-text="buttonTextValue"
        @input="cambiar()"
      >
        <template slot="file-name" slot-scope="{ names }">
          <b-badge variant="dark">{{ names[0] }}</b-badge>
        </template>
      </b-form-file>
      <b-button size="sm" class="mt-2" @click="file = null">Reset</b-button>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
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
  mixins: [wcFormElementsMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    buttonTextValue: {
      type: String,
      default: 'Browse'
    }
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    cambiar() {
      console.log('cambiar')
      console.log('file', this.file)
      this.$emit('input', this.file)
    }
  }
}
</script>
