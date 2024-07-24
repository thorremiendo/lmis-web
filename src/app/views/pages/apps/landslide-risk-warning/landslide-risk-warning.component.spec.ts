import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandslideRiskWarningComponent } from './landslide-risk-warning.component';

describe('LandslideRiskWarningComponent', () => {
  let component: LandslideRiskWarningComponent;
  let fixture: ComponentFixture<LandslideRiskWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandslideRiskWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandslideRiskWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
