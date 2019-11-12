export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    state: {
      type: [Boolean, null],
      default: null
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    validation: {
      type: Object,
      default: () => ({})
    },
    formTextHelpUsers: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    value: ''
  },
  computed: {
    isARequiredFiled() {
      return this.validation.hasOwnProperty('required')
    }
  }
}
