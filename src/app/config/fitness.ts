export const getFitnessStep = () => {
  return {
    key: 'fitness',
    type: '',
    label: 'Fitness',
    fields: [
      {
        id: 'exercise',
        label: 'do you do exercise?',
        type: 'boolean',
        value: false,
        required: false,
        options: [],
        errorMessage: '',
      },
    ],
  };
}
