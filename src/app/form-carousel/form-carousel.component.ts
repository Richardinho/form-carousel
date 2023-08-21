import { Component, ComponentRef, EventEmitter, HostBinding, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  group,
} from '@angular/animations';

import { FormHostDirective } from '../form-host.directive';
import { FieldsService } from '../fields.service';
import { EmitterEvent, Page, Step } from '../types';
import { StepComponent } from '../step/step.component';
import { SummaryComponent } from '../summary/summary.component';

const ANIMATION_TIMING = '600ms ease-out';

@Component({
  selector: 'app-form-carousel',
  templateUrl: './form-carousel.component.html',
  animations: [
    trigger('trigger', [
      transition(':increment', [
        group([
          query(':enter', [
            style({ transform: 'translate(100%, 0)' }),
            animate(
              ANIMATION_TIMING,
              style({ transform: 'translate(0, 0)' })
            ),
          ], {optional: true}),
          query(
            ':leave',
            [
              animate(
                ANIMATION_TIMING,
                style({ transform: 'translate(-100%, 0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition(':decrement', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'translate(-100%, 0)' }),
              animate(
                ANIMATION_TIMING,
                style({ transform: 'translate(0, 0)' })
              ),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              animate(
                ANIMATION_TIMING,
                style({ transform: 'translate(100%, 0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
  styleUrls: ['./form-carousel.component.css'],
})
export class FormCarouselComponent implements OnInit {
  @HostBinding('@trigger') public stepCounter = 0;

  @ViewChild(FormHostDirective, {static: true}) formHost!: FormHostDirective;

  constructor(private fieldsService: FieldsService) {}

  viewContainerRef!: ViewContainerRef;

  emitter = new EventEmitter();

  componentRef!: ComponentRef<Page>;

  private loadStep(stepData: Step) {
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(StepComponent);
    this.componentRef.instance.emitter = this.emitter;
    this.componentRef.instance.stepData = stepData;
  }

  loadFirstStep() {
    const stepData = this.fieldsService.getFirstStep();
    this.stepCounter =  this.stepCounter + 1;
    this.loadStep(stepData)
  }

  loadNextStep(prevStepData: Step) {
    this.stepCounter =  this.stepCounter + 1;
    const stepData = this.fieldsService.getNextStep(prevStepData);
    this.loadStep(stepData)
  }

  loadPrevStep(prevStepData: Step) {
    this.stepCounter = this.stepCounter - 1;
    const stepData = this.fieldsService.getPrevStep(prevStepData);

    if(!stepData) {
      throw new Error('previous step does not exist');
    }

    this.loadStep(stepData)
  }

  loadSummaryPage(prevStepData: Step) {

    this.stepCounter = this.stepCounter + 1;

    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(SummaryComponent);

    const summaryComponent = <SummaryComponent> this.componentRef.instance;
    summaryComponent.emitter = this.emitter;
    summaryComponent.summaryData = this.fieldsService.getSummaryData(prevStepData);
  }

  edit(sectionKey?: string) {
    if (sectionKey) {
      this.stepCounter = this.stepCounter - 1;
      const stepData = this.fieldsService.editSection(sectionKey);

      if (!stepData) {
        throw new Error('edit step doesn\'t exist');
      }

      this.loadStep(stepData)
    }
  }

  ngOnInit() {
    this.viewContainerRef = this.formHost.viewContainerRef;

    this.emitter.subscribe((event: EmitterEvent) => {
      if(event.type === 'next') {
        this.loadNextStep(event.stepData);
      } else if(event.type === 'prev') {
        this.loadPrevStep(event.stepData);
      } else if(event.type === 'submit') {
        this.loadSummaryPage(event.stepData);
      } else if(event.type === 'edit') {
        this.edit(event.sectionKey);
      }
     });

    this.loadFirstStep();
  }
}
