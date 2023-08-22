import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormHost]'
})
export class FormHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
