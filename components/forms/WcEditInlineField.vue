<template>
  <div>
    <p class="mt-4 mb-0">
      <span class="font-weight-bold">{{ labels }}:</span>
      <span>{{ actualValue }}</span>
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
          id="user-name"
          :value="wcInputValue"
          :validation="validation"
          :state="validation.$error ? false : null"
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
    actualValue: {
      type: String,
      default: ''
    },
    wcInputValue: {
      type: String,
      default: ''
    },
    validation: {
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
  methods: {
    closeEdit() {
      this.$root.$emit('bv::toggle::collapse', this.id)
    },
    edit(field) {
      this.$root.$emit('bv::toggle::collapse', this.id)
    },
    async submit() {
      try {
        this.isFormProcessing = true
        await this.$refs.wcForm.validationForm(this.validation)
        for (const key in this.objectToSendServer.contentToUpdate) {
          this.objectToSendServer.contentToUpdate[key] = this.value
        }
        await this.$axios.$post(this.endPointPath, this.objectToSendServer, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        })
        this.$emit('updated')
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
