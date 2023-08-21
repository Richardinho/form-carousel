import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepComponent } from './step.component';

xdescribe('Step2Component', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepComponent]
    });
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
