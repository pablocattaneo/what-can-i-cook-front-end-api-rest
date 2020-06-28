<template>
  <div class="row">
    <p>
      <span class="font-weight-bold">{{ $t('User_name') }}:</span>
      <span>{{ actualValue }}</span>
      <b-icon-pencil-square
        @click="edit"
        :animation="animation"
        variant="primary"
        class="ml-2 icon wc-cursor-pointer"
        scale="1.2"
      />
    </p>
    <b-collapse id="user-name-collapse" class="col-12">
      <WcForm ref="wcForm" class="px-2">
        <WcInput
          id="user-name"
          :value="wcInputValue"
          :validation="validation"
          :state="validation.$error ? false : null"
          :label="$t('User_name') + ':'"
          :placeholder="$t('User_name')"
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
      animation: null,
      value: ''
    }
  },
  methods: {
    closeEdit() {
      this.$root.$emit('bv::toggle::collapse', 'user-name-collapse')
    },
    edit(field) {
      this.$root.$emit('bv::toggle::collapse', 'user-name-collapse')
      this.animation = 'throb'
      setTimeout(() => {
        this.animation = null
      }, 800)
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
