import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidRiskAssessmentComponent } from './rapid-risk-assessment.component';

describe('RapidRiskAssessmentComponent', () => {
  let component: RapidRiskAssessmentComponent;
  let fixture: ComponentFixture<RapidRiskAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapidRiskAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapidRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
