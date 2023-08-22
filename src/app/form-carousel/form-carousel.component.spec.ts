import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormCarouselComponent } from './form-carousel.component';
import { FormHostDirective } from '../form-host.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { StepComponent } from '../step/step.component';
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
import { PERSONAL_STEP_DATA } from '../config/personal';
import { SummaryComponent } from '../summary/summary.component';

describe('FormCarousel', () => {
  let fixture: ComponentFixture<FormCarouselComponent>;
  let component: FormCarouselComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormCarouselComponent,
        FormHostDirective,
        StepComponent,
        SummaryComponent,
      ],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
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
      ],
    });

    fixture = TestBed.createComponent(FormCarouselComponent);
    component = <FormCarouselComponent>fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('loadNextStep()', () => {
    describe('when next step exists', () => {
      it('should load next step', fakeAsync(() => {
        expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
          'Personal'
        );

        component.loadNextStep(createStep('personal'));

        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
          'Your Preferences'
        );
      }));
    });

    describe('when next step does NOT exist', () => {
      it('should load next step', fakeAsync(() => {
        const errorFn = () => {
          component.loadNextStep(createStep('foo'));
        };

        expect(errorFn).toThrowError('next step does not exist');
      }));
    });
  });

  describe('loadPrevStep()', () => {
    describe('when prev step exists', () => {
      it('should load previous step', fakeAsync(() => {
        // loads color step
        component.loadNextStep(PERSONAL_STEP_DATA);

        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
          'Your Preferences'
        );

        component.loadPrevStep(createStep('color'));

        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
          'Personal'
        );
      }));
    });

    describe('when prev step does NOT exist', () => {
      it('should throw error', fakeAsync(() => {
        const errorFn = () => {
          component.loadPrevStep(createStep('color'));
        };

        expect(errorFn).toThrowError('previous step does not exist');
      }));
    });
  });

  describe('loadSummaryPage()', () => {
    it('should load summary page', fakeAsync(() => {
      component.loadSummaryPage(createStep(''));

      fixture.detectChanges();
      tick();

      expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
        'Summary'
      );
    }));
  });

  describe('edit()', () => {
    describe('when requested step exists', () => {
      it('should reload requested step', fakeAsync(() => {
        // loads color step and puts personal step in completed list
        component.loadNextStep(PERSONAL_STEP_DATA);

        component.edit('personal');

        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('h2').textContent).toBe(
          'Personal'
        );
      }));
    });

    describe('when requested step does NOT exist', () => {
      it('should throw error', () => {
        const errorFn = () => {
          component.edit('personal');
        };

        expect(errorFn).toThrowError("edit step doesn't exist");
      });
    });
  });

  describe('ngOnInit()', () => {
    describe("when event emitted is 'next'", () => {
      it('should load next step', () => {
        const spyOnLoadNextStep = jest.spyOn(component, 'loadNextStep');

        component.emitter.emit({
          type: 'next',
        });

        expect(spyOnLoadNextStep).toHaveBeenCalled();
      });
    });

    describe("when event emitted is 'prev'", () => {
      it('should load previous step', () => {
        const spyOnLoadPrevStep = jest.spyOn(component, 'loadPrevStep');

        component.emitter.emit({
          type: 'prev',
        });

        expect(spyOnLoadPrevStep).toHaveBeenCalled();
      });
    });

    describe("when event emitted is 'submit'", () => {
      it('should load summary page', () => {
        const spyOnLoadSummaryPage = jest.spyOn(component, 'loadSummaryPage');

        component.emitter.emit({
          type: 'submit',
        });

        expect(spyOnLoadSummaryPage).toHaveBeenCalled();
      });
    });

    describe("when event emitted is 'edit'", () => {
      it('should reload edit step', () => {
        const spyOnEdit = jest.spyOn(component, 'edit');

        component.emitter.emit({
          type: 'edit',
        });

        expect(spyOnEdit).toHaveBeenCalled();
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
