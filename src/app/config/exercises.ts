export const getExerciseStep = () => {
  return {
    key: 'exercise',
    type: 'last',
    label: 'Exercises',
    fields: [
      {
        id: 'pushups',
        label: 'do you do pushups?',
        type: 'boolean',
        value: false,
        required: false,
        options: [],
        errorMessage: '',
      },
    ],
  };
};
