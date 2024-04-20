import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainGaugeComponent } from './rain-gauge.component';

describe('RainGaugeComponent', () => {
  let component: RainGaugeComponent;
  let fixture: ComponentFixture<RainGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RainGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
