import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmitterEvent, Field, Step } from '../types';
import { createStepData } from '../utils';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
})
export class StepComponent implements OnInit {
  stepData!: Step;

  emitter!: EventEmitter<EmitterEvent>;

  formGroup: FormGroup = new FormGroup({});

  clickNext() {
    this.emitter.emit({
      stepData: createStepData(this.stepData, this.formGroup.value),
      type: 'next',
      sectionKey: '',
    });
  }

  clickPrev() {
    this.emitter.emit({
      stepData: createStepData(this.stepData, this.formGroup.value),
      type: 'prev',
      sectionKey: '',
    });
  }

  clickSubmit() {
    this.emitter.emit({
      type: 'submit',
      stepData: createStepData(this.stepData, this.formGroup.value),
      sectionKey: '',
    });
  }

  ngOnInit() {
    this.stepData.fields.forEach((field: Field) => {
      const formControl: FormControl = new FormControl(field.value);

      if (field.required) {
        formControl.setValidators(Validators.required);
      }

      this.formGroup.addControl(field.id, formControl);
    });
  }
}
