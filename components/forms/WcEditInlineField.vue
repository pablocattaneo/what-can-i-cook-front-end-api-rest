<template>
  <div>
    <p class="mt-4 mb-0">
      <span class="font-weight-bold">{{ labels }}:</span>
      <span>{{ currentValue }}</span>
      <b-icon-pencil-square
        @click="edit"
        variant="primary"
        class="ml-2 icon wc-cursor-pointer"
        scale="1.2"
      />
    </p>
    <b-collapse :id="id" class="mt-2">
      <WcForm ref="wcForm" class="px-2">
        <WcInput
          ref="wcInput"
          :value="currentValue"
          :validation="$v.value"
          :state="$v.value.$error ? false : null"
          :label="labels + ':'"
          :placeholder="labels"
          @input="value = $event"
          type="text"
          class="w-100"
        />
        <b-button @click="closeEdit" variant="secondary">{{
          $t('Cancel')
        }}</b-button>
        <WcButtonSubmit
          @click.native="submit"
          :isProcessing="isFormProcessing"
        />
      </WcForm>
    </b-collapse>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, minLength, email } from 'vuelidate/lib/validators'
import { BIconPencilSquare } from 'bootstrap-vue'
import WcInput from '@/components/forms/WcInput.vue'
import WcForm from '@/components/forms/WcForm.vue'
import WcButtonSubmit from '@/components/forms/WcButtonSubmit'
import wcHandleError from '@/mixins/wc-handle-error.js'

export default {
  components: {
    WcInput,
    WcForm,
    WcButtonSubmit,
    BIconPencilSquare
  },
  mixins: [wcHandleError],
  props: {
    labels: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'user-name-collapse',
      required: true
    },
    objectToSendServer: {
      type: Object,
      default: () => ({})
    },
    currentValue: {
      type: String,
      default: ''
    },
    validationsRules: {
      type: Object,
      default: () => ({})
    },
    endPointPath: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      isFormProcessing: false,
      value: ''
    }
  },
  validations() {
    console.log('validationsRules', this.validationsRules)
    const requiredRule = this.validationsRules.required
    const minLengthRule = this.validationsRules.minLength
    const emailRule = this.validationsRules.email
    console.log('minLengthRule', minLengthRule)
    return {
      value: {
        required: requiredRule ? required : false,
        email: emailRule ? email : false,
        minLength: minLengthRule ? minLength(minLengthRule) : false
      }
    }
  },
  methods: {
    closeEdit() {
      this.$root.$emit('bv::toggle::collapse', this.id)
    },
    edit(field) {
      this.$root.$emit('bv::toggle::collapse', this.id)
      this.$refs.wcInput.focus()
    },
    async submit() {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        for (const key in this.objectToSendServer.contentToUpdate) {
          this.objectToSendServer.contentToUpdate[key] = this.value
        }
        await this.$axios.$post(this.endPointPath, this.objectToSendServer, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        })
        this.$emit('updated')
        this.$root.$emit('bv::toggle::collapse', this.id)
      } catch (error) {
        this.serverErrorsHandler(error)
      } finally {
        this.isFormProcessing = false
      }
    }
  }
}
</script>

<style></style>
