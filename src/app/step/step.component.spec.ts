import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepComponent } from './step.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import { EventEmitter } from '@angular/core';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  const ERROR_MESSAGE = 'an error occurred'
  const SELECT_ERROR_MESSAGE = 'a select error occurred';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
      ]
    });
    fixture = TestBed.createComponent(StepComponent);
    component = <StepComponent> fixture.componentInstance;
  });

  describe('when user clicks next button', () => {

    it("should emit 'next' event", waitForAsync (() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'first',
        fields: []
      };

      component.stepData = step;
      component.emitter = new EventEmitter();

      fixture.detectChanges();

      let eventType: string;

      component.emitter.subscribe(event => {
        eventType = event.type;
      });

      const nextButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=next-button]");
      nextButton.click();

      fixture.whenStable().then(() => {
        expect(eventType).toBe('next');
      });
    }));
  })

  describe('when user clicks prev button', () => {
    it("should emit 'prev' event", waitForAsync(() => {
      const step = {
        key: '',
        label: '',
        type: 'last',
        fields: []
      };

      component.stepData = step;
      component.emitter = new EventEmitter();

      fixture.detectChanges();

      let eventType: string;

      component.emitter.subscribe(event => {
        eventType = event.type;
      });

      const prevButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=prev-button]");
      prevButton.click();

      fixture.whenStable().then(() => {
        expect(eventType).toBe('prev');
      });
    }));
  })

  describe('when form is invalid and submit button is visible', () => {
    it('should disable submit button', () => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'last',
        fields: [
          {
            errorMessage: ERROR_MESSAGE,
            id: 'firstName',
            label: 'first name',
            options: [],
            required: true,
            type: 'text',
            value: '',
          },
        ]
      };

      component.stepData = step;

      fixture.detectChanges();

      const submitButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=submit-button]");

      expect(submitButton.hasAttribute('disabled')).toBe(true);
    });
  })

  describe('when form is invalid and next button is visible', () => {
    it('should disable next button', () => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'first',
        fields: [
          {
            errorMessage: ERROR_MESSAGE,
            id: 'firstName',
            label: 'first name',
            options: [],
            required: true,
            type: 'text',
            value: '',
          },
        ]
      };

      component.stepData = step;

      fixture.detectChanges();

      const nextButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=next-button]");

      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('when user clicks submit button', () => {
    it("should emit 'submit' event", waitForAsync(() => {
      const step = {
        key: '',
        label: '',
        type: 'last',
        fields: []
      };

      component.stepData = step;
      component.emitter = new EventEmitter();

      fixture.detectChanges();

      let eventType: string;

      component.emitter.subscribe(event => {
        eventType = event.type;
      });

      const submitButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=submit-button]");
      submitButton.click();

      fixture.whenStable().then(() => {
        expect(eventType).toEqual('submit');
      });
    }));
  })

  describe('when step is neither first nor last', () => {
    beforeEach(() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: '',
        fields: []
      };

      component.stepData = step;
      fixture.detectChanges();
    });

    it('should show next button', () => {
      const nextButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=next-button]");
      expect(nextButton.hasAttribute('hidden')).toBe(false);
    });

    it('should show prev button', () => {
      const prevButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=prev-button]");
      expect(prevButton.hasAttribute('hidden')).toBe(false);
    });

    it('should NOT show submit button', () => {
      const submitButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=submit-button]");
      expect(submitButton.hasAttribute('hidden')).toBe(true);
    });
  })

  describe('when step is first', () => {
    beforeEach(() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'first',
        fields: [
          {
            errorMessage: ERROR_MESSAGE,
            id: 'firstName',
            label: 'first name',
            options: [],
            required: true,
            type: 'text',
            value: 'Richard',
          },
        ]
      };

      component.stepData = step;
      fixture.detectChanges();

    });

    it('should show next button', () => {
      const nextButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=next-button]");
      expect(nextButton.hasAttribute('hidden')).toBe(false);
    });

    it('should NOT show prev button', () => {
      const prevButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=prev-button]");
      expect(prevButton.hasAttribute('hidden')).toBe(true);
    });

    it('should NOT show submit button', () => {
      const submitButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=submit-button]");
      expect(submitButton.hasAttribute('hidden')).toBe(true);
    });
  });

  describe('when step is last', () => {
    beforeEach(() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'last',
        fields: []
      };

      component.stepData = step;
      fixture.detectChanges();
    });

    it('should show prev button', () => {
      const prevButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=prev-button]");
      expect(prevButton.hasAttribute('hidden')).toBe(false);
    });

    it('should show submit button', () => {
      const submitButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=submit-button]");
      expect(submitButton.hasAttribute('hidden')).toBe(false);
    });

    it('should NOT show next button', () => {
      const nextButton = <HTMLButtonElement> fixture.nativeElement.querySelector("[data-test=next-button]");
      expect(nextButton.hasAttribute('hidden')).toBe(true);
    });
  })

  describe('when input field is invalid', () => {
    beforeEach(() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'first',
        fields: [
          {
            errorMessage: ERROR_MESSAGE,
            id: 'firstName',
            label: 'first name',
            options: [],
            required: true,
            type: 'text',
            value: 'Richard',
          },
        ]
      };

      component.stepData = step;
      fixture.detectChanges();
    });

    describe('when field has been touched', () => {
      it('should display error message', async () => {

        const input = <HTMLInputElement> fixture.nativeElement.querySelector('input');

        input.value = '';
        component.formGroup.get('firstName')?.markAsTouched()

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const errorField = fixture.nativeElement.querySelector("[data-test=input-error]");

        expect(errorField.textContent.trim()).toEqual(ERROR_MESSAGE);
      })
    });

    describe('when field has NOT been touched', () => {
      it('should NOT display error message', async () => {

        const input = <HTMLInputElement> fixture.nativeElement.querySelector('input');

        input.value = '';

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const errorField = fixture.nativeElement.querySelector("[data-test=input-error]");

        expect(errorField).toBeNull();
      })
    });
  });

  describe('when select field is invalid', () => {
    beforeEach(() => {
      const step = {
        key: 'personal',
        label: 'Personal',
        type: 'first',
        fields: [
          {
            errorMessage: SELECT_ERROR_MESSAGE,
            id: 'job',
            label: 'job',
            options: [],
            required: true,
            type: 'select',
            value: '',
          },
        ]
      };

      component.stepData = step;
      fixture.detectChanges();
    });

    describe('when field has been touched', () => {
      it('should display error message', async () => {
        const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

        const select = await loader.getHarness(MatSelectHarness);
        component.formGroup.get('job')?.markAsTouched();

        await select.open();

        const errorField = fixture.nativeElement.querySelector("[data-test=select-error]");

        expect(errorField.textContent.trim()).toEqual(SELECT_ERROR_MESSAGE);
      });
    });

    describe('when field has NOT been touched', () => {
      it('should NOT display error message', async() => {
        const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

        const select = await loader.getHarness(MatSelectHarness);

        await select.open();

        const errorField = fixture.nativeElement.querySelector("[data-test=select-error]");

        expect(errorField).toBeNull();
      });
    });
  })
});
