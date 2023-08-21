import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

export type Option = {
  label: string;
  value: string;
};

export type Field = {
  id: string;
  label: string;
  type: string;
  value: string | boolean | number;
  required: boolean;
  options: Array<Option>
  errorMessage: string;
};

export type Step = {
  key: string;
  type: string;
  label: string;
  fields: Array<Field>;
};

export type EmitterEvent = {
  type: string;
  stepData: Step;
  sectionKey?: string;
};

export interface Page {
  emitter: EventEmitter<EmitterEvent>;
  formGroup: FormGroup;
  stepData: Step;
}

export type SummaryData = {
  key: string;
  label: string;
  fields: Array<{ id: string; label: string; value: boolean | number | string}>
};

