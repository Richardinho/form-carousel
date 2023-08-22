export const TV_STEP_DATA = {
  key: 'tv',
  type: 'last',
  label: 'Television Progammes',
  fields: [
    {
      id: 'tv-programme',
      label: 'what is your favourite tv programme?',
      type: 'select',
      value: '',
      required: false,
      errorMessage: '',
      options: [
        { label: 'Dallas', value: 'Dallas' },
        { label: 'Seinfeld', value: 'Seinfeld' },
        { label: 'Cheers', value: 'Cheers' },
        { label: 'Different Strokes', value: 'Different Strokes' },
      ],
    },
  ],
};
