import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandslideReportComponent } from './landslide-report.component';

describe('LandslideReportComponent', () => {
  let component: LandslideReportComponent;
  let fixture: ComponentFixture<LandslideReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandslideReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandslideReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
