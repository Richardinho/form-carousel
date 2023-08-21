export const COLOR_STEP_DATA = {
  key: 'color',
  type: '',
  label: 'Your Preferences',
  fields: [{
    id: 'color',
    label: 'whats your favourite color?',
    type: 'select',
    value: '',
    required: true,

    options: [
      { label: 'red', value: 'red'},
      { label: 'blue', value: 'blue'},
      { label: 'green', value: 'green'},
      { label: 'yellow', value: 'yellow'},
      { label: 'orange', value: 'orange'},
      { label: 'purple', value: 'purple'},
    ],
    errorMessage: 'you must include your favourite color'
  }]
};
