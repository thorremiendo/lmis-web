import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InclinometerComponent } from './inclinometer.component';

describe('InclinometerComponent', () => {
  let component: InclinometerComponent;
  let fixture: ComponentFixture<InclinometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InclinometerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InclinometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
