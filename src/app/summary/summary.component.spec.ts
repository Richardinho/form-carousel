import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { EventEmitter } from '@angular/core';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent]
    });

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when edit button is clicked', () => {
    it('should emit an event with the sectionKey', () => {
      const SECTION_KEY = 'section-key';

      component.summaryData = [
        {
          label: '',
          key: SECTION_KEY,
          fields: [],
        }
      ]

      fixture.detectChanges();
      
      const editButton = fixture.nativeElement.querySelector('button');

      component.emitter = new EventEmitter();
      component.emitter.subscribe((event) => {
        expect(event.sectionKey).toBe(SECTION_KEY);
      });

      editButton.dispatchEvent(new Event('click'));
    })
  });
});

