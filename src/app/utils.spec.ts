import { FormControl, FormGroup } from "@angular/forms";
import { createStepData } from "./utils";

describe('utils', () => {

  it('should create step data from form data', () => {
    const formGroup = new FormGroup({});
    formGroup.addControl('job', new FormControl('dev'));
    formGroup.addControl('color', new FormControl('red'));

    const stepData = {
      key: 'color',
      type: '',
      label: 'Your Preferences',
      fields: [
        {
          id: 'color',
          label: 'whats your favourite color?',
          type: 'text',
          value: '',
          errorMessage: 'you must include your favourite color',
          required: true,
          options: [],
        },
        {
          id: 'job',
          label: 'what is your job?',
          type: 'text',
          value: '',
          errorMessage: 'you must include your job?',
          required: true,
          options: [],
        }
      ],
    };

    expect(createStepData(stepData, formGroup.value)).toEqual({
      key: 'color',
      type: '',
      label: 'Your Preferences',
      fields: [
        {
          id: 'color',
          label: 'whats your favourite color?',
          type: 'text',
          value: 'red',
          errorMessage: 'you must include your favourite color',
          required: true,
          options: [],
        },
        {
          id: 'job',
          label: 'what is your job?',
          type: 'text',
          value: 'dev',
          errorMessage: 'you must include your job?',
          required: true,
          options: [],
        }
      ],
    });
  })
})
