import { Component, EventEmitter } from '@angular/core';
import { EmitterEvent, Step, SummaryData } from '../types';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  emitter!: EventEmitter<EmitterEvent>;
  stepData!: Step;
  formGroup!: FormGroup;
  summaryData!: Array<SummaryData>;

  editField(sectionKey: string) {
    this.emitter.emit({
      type: 'edit',
      stepData: {} as Step,
      sectionKey,
    });
  }
}
