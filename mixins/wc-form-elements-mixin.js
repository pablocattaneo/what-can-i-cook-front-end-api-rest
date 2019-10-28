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
    labelFor: {
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
    vModel: ''
  }
}
