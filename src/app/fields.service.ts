import { Injectable } from '@angular/core';
import { getPersonalStep } from './config/personal';
import { getTVStep } from './config/tv';
import { getFitnessStep } from './config/fitness';
import { getColorStep } from './config/color';
import { getExerciseStep } from './config/exercises';
import { Step } from './types';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  completedSteps: Array<Step> = [];
  tempQueue: Array<Step> = [];

  // todo: change section to step
  editSection(sectionKey: string): Step | null {
    const step = this.completedSteps.pop();

    if (step) {
      if (step.key === sectionKey) {
        return step;
      } else {
        this.tempQueue.push(step);
        return this.editSection(sectionKey);
      }
    } else {
      return null;
    }
  }

  getSummaryData(currentStep: Step) {
    this.completedSteps.push(currentStep);

    return this.completedSteps.map((step: Step) => {
      return {
        key: step.key,
        label: step.label,
        fields: step.fields.map((field) => {
          return {
            id: field.id,
            label: field.label,
            value: field.value,
          };
        }),
      };
    });
  }

  getFirstStep() {
    return getPersonalStep();
  }

  getPrevStep(stepData: Step): Step | null {
    this.tempQueue.push(stepData);

    const prevStep = this.completedSteps.pop();

    return prevStep || null;
  }

  getNextStep(currentStep: Step): Step | null {
    let nextStep: Step;

    this.completedSteps.push(currentStep);

    const key = currentStep.key;

    if (key === 'personal') {
      nextStep = getColorStep();
    } else if (key === 'color') {
      nextStep = getFitnessStep();
    } else if (key === 'fitness') {
      if (currentStep.fields[0].value === true) {
        nextStep = getExerciseStep();
      } else {
        nextStep = getTVStep();
      }
    } else {
      return null;
    }

    /*
     *  get next step from cache if possible
     *  otherwise, empty cache
     */

    if (this.tempQueue.length) {
      const cachedStep = this.tempQueue.pop();

      if (cachedStep && cachedStep.key === nextStep.key) {
        nextStep = cachedStep;
      } else {
        this.tempQueue = [];
      }
    }

    return nextStep;
  }
}
