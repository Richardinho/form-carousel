import { Injectable } from '@angular/core';
import { PERSONAL_STEP_DATA } from './config/personal';
import { TV_STEP_DATA } from './config/tv';
import { FITNESS_STEP_DATA } from './config/fitness';
import { COLOR_STEP_DATA } from './config/color';
import { EXERCISE_STEP_DATA } from './config/exercises';
import { Step } from './types'

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  completedSteps: Array<Step> = [];
  tempQueue: Array<Step> = [];

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

  getSummaryData(prevStepData: Step) {
    this.completedSteps.push(prevStepData)

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
    return PERSONAL_STEP_DATA
  }

  getPrevStep(prevStepData: Step) {
    this.tempQueue.push(prevStepData)

    return this.completedSteps.pop();
  }

  getNextStep(prevStepData: Step) {

    let nextStep: Step;

    this.completedSteps.push(prevStepData);

    const key = prevStepData.key;

    if (key === 'personal') {
      nextStep = COLOR_STEP_DATA;
    } else if (key === 'color') {
      nextStep = FITNESS_STEP_DATA;
    } else if (key === 'fitness') {
      if (prevStepData.fields[0].value === true) {
        nextStep = EXERCISE_STEP_DATA;
      } else {
        nextStep = TV_STEP_DATA
      }
    } else {
      throw new Error('step does not exist for key: ' + key);
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

    return nextStep
  }
}
