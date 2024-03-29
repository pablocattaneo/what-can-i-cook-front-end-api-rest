export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
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
    isARequiredFiled () {
      return 'required' in this.validation
    }
  }
}
