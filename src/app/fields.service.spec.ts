import { getColorStep } from './config/color';
import { getExerciseStep } from './config/exercises';
import { getFitnessStep } from './config/fitness';
import { getTVStep } from './config/tv';
import { FieldsService } from './fields.service';
import { Field, Step, SummaryData } from './types';

describe('FieldsService', () => {
  let fieldsService: FieldsService;
  let currentStep: Step;
  let fitnessStep: Step;
  let colorStep: Step;

  const prevStepKey = 'prev-step';
  const currentStepKey = 'current-step';
  const personalStepKey = 'personal';
  const colorStepKey = 'color';
  const fitnessStepKey = 'fitness';

  let result: Step | null;

  beforeEach(() => {
    fieldsService = new FieldsService();
  });

  describe('editSection()', () => {
    const sectionKey = 'two';

    describe('when step exists in completed steps', () => {
      let step1: Step;
      let step2: Step;
      let step3: Step;

      beforeEach(() => {
        step1 = createStep('one');
        step2 = createStep('two');
        step3 = createStep('three');

        fieldsService.completedSteps = [step1, step2, step3];

        result = fieldsService.editSection(sectionKey);
      });

      it('should return step corresponding to sectionKey', () => {
        expect(result).toEqual(step2);
      });

      it('should put steps above found step in temporary queue', () => {
        expect(fieldsService.tempQueue).toEqual([step3]);
      });
    });

    describe('when step does NOT exist in completed steps', () => {
      it('should return null', () => {
        fieldsService.completedSteps = [];
        result = fieldsService.editSection(sectionKey);
        expect(result).toBeNull();
      });
    });
  });

  describe('getSummaryData()', () => {
    let summaryData: Array<SummaryData>;

    beforeEach(() => {
      currentStep = createStep(currentStepKey);
      currentStep.fields = [
        {
          id: 'foo',
          label: 'blah',
          value: 'bar',
          errorMessage: '',
          required: false,
          options: [],
          type: '',
        },
      ];
      summaryData = fieldsService.getSummaryData(currentStep);
    });

    it('should add step to completed steps', () => {
      expect(fieldsService.completedSteps).toEqual([currentStep]);
    });

    it('should return summary data', () => {
      expect(summaryData).toEqual([
        {
          key: currentStepKey,
          label: '',
          fields: [
            {
              id: 'foo',
              label: 'blah',
              value: 'bar',
            },
          ],
        },
      ]);
    });
  });

  describe('getPrevStep()', () => {
    let prevStep: Step;

    beforeEach(() => {
      currentStep = createStep(currentStepKey);
      prevStep = createStep(prevStepKey);
    });

    describe('when previous step exists', () => {
      beforeEach(() => {
        fieldsService.completedSteps = [prevStep];
        result = fieldsService.getPrevStep(currentStep);
      });

      it('should store current step in temporary queue', () => {
        expect(fieldsService.tempQueue).toEqual([currentStep]);
      });

      it('should return previous step', () => {
        expect(result).toEqual(prevStep);
      });
    });

    describe('when previous step does NOT exist', () => {
      beforeEach(() => {
        fieldsService.completedSteps = [];
        result = fieldsService.getPrevStep(currentStep);
      });

      it('should return null', () => {
        expect(result).toBeNull();
      });
    });

    describe('getNextStep()', () => {
      describe('when coming from personal step', () => {
        it('should return color step', () => {
          currentStep = createStep(personalStepKey);
          result = fieldsService.getNextStep(currentStep);

          expect(result).toEqual(getColorStep());
        });
      });

      describe('when coming from color step', () => {
        it('should return fitness step', () => {
          currentStep = createStep(colorStepKey);
          result = fieldsService.getNextStep(currentStep);

          expect(result).toEqual(getFitnessStep());
        });
      });

      describe('when coming from fitness step', () => {
        describe('when user does exercise', () => {
          it('should return exercise step', () => {
            currentStep = createStep(fitnessStepKey);
            currentStep.fields = [
              {
                value: true,
              } as Field,
            ];

            result = fieldsService.getNextStep(currentStep);

            expect(result).toEqual(getExerciseStep());
          });
        });

        describe('when user does NOT do exercise', () => {
          it('should return tv step', () => {
            currentStep = createStep(fitnessStepKey);
            currentStep.fields = [
              {
                value: false,
              } as Field,
            ];

            result = fieldsService.getNextStep(currentStep);

            expect(result).toEqual(getTVStep());
          });
        });
      });

      describe('when key is not recognised', () => {
        it('should throw error', () => {
          currentStep = createStep('unknown-key');

          expect(fieldsService.getNextStep(currentStep)).toBeNull();
        });
      });

      describe('when step can be returned from temporary queue', () => {
        it('should return step from temporary queue', () => {
          currentStep = createStep(personalStepKey);
          colorStep = createStep(colorStepKey);
          fieldsService.tempQueue = [colorStep];

          result = fieldsService.getNextStep(currentStep);

          expect(result).toBe(colorStep);
        });
      });

      describe('when step cannot be returned from temporary queue', () => {
        beforeEach(() => {
          currentStep = createStep(personalStepKey);
          fitnessStep = createStep(fitnessStepKey);
          fieldsService.tempQueue = [fitnessStep];

          result = fieldsService.getNextStep(currentStep);
        });

        it('should return step as normal', () => {
          expect(result).toEqual(getColorStep());
        });

        it('should empty temporary queue', () => {
          expect(fieldsService.tempQueue.length).toBe(0);
        });
      });
    });
  });

  function createStep(sectionKey: string) {
    return {
      key: sectionKey,
      type: '',
      label: '',
      fields: [],
    };
  }
});
