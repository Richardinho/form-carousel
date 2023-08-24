export const getPersonalStep = () => {
  return {
    key: 'personal',
    label: 'Personal',
    type: 'first',
    fields: [
      {
        errorMessage: 'you must include your first name',
        id: 'firstName',
        label: 'first name',
        options: [],
        required: true,
        type: 'text',
        value: 'Richard',
      },
      {
        errorMessage: 'you must include your last name',
        id: 'lastName',
        label: 'last name',
        options: [],
        required: true,
        type: 'text',
        value: 'Hunter',
      },
      {
        errorMessage: 'you need to select a job',
        id: 'job',
        label: 'job',
        type: 'select',
        value: '',
        required: true,
        options: [
          { label: 'Fireman', value: 'fireman' },
          { label: 'Software Developer', value: 'dev' },
          { label: 'Artist', value: 'artist' },
          { label: 'Television Presenter', value: 'tv-presenter' },
        ],
      },
    ],
  };
}
