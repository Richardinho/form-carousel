import { Step } from './types';

type FormData = {
  [key: string]: string | number | boolean;
};

export const createStepData = (stepData: Step, formData: FormData) => {
  const result = { ...stepData };

  for (let i = 0; i < result.fields.length; i++) {
    result.fields[i] = {
      ...result.fields[i],
      value: formData[result.fields[i].id],
    };
  }

  return result;
};
