<template>
  <div>
    <p class="mt-4 mb-0">
      <span class="font-weight-bold">{{ labels }}:</span>
      <span id="current-value">{{ currentValue }}</span>
      <b-icon-pencil-square
        id="b-icon-pencil-square"
        variant="primary"
        class="ml-2 icon wc-cursor-pointer"
        scale="1.2"
        @click="edit"
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
          type="text"
          class="w-100"
          @input="value = $event"
        />
        <b-button id="cancelButton" variant="secondary" @click="closeEdit">
          {{
            $t('Cancel')
          }}
        </b-button>
        <WcButtonSubmit
          :is-processing="isFormProcessing"
          @click.native="submit"
        />
      </WcForm>
    </b-collapse>
  </div>
</template>

<script>
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
  data () {
    return {
      isFormProcessing: false,
      value: '',
      objectToSendServerData: {}
    }
  },
  validations () {
    const requiredRule = this.validationsRules.required
    const minLengthRule = this.validationsRules.minLength
    const emailRule = this.validationsRules.email
    return {
      value: {
        required: requiredRule ? required : false,
        email: emailRule ? email : false,
        minLength: minLengthRule ? minLength(minLengthRule) : false
      }
    }
  },
  created () {
    this.value = this.currentValue
    this.objectToSendServerData = { ...this.objectToSendServer }
  },
  methods: {
    closeEdit () {
      this.$root.$emit('bv::toggle::collapse', this.id)
    },
    edit () {
      this.$root.$emit('bv::toggle::collapse', this.id)
      this.$refs.wcInput.focus()
    },
    async submit () {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.$v)
        for (const key in this.objectToSendServerData.contentToUpdate) {
          this.objectToSendServerData.contentToUpdate[key] = this.value
        }
        await this.$axios.$post(this.endPointPath, this.objectToSendServerData, {
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
