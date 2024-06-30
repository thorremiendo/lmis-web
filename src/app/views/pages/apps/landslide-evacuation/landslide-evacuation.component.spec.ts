import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandslideEvacuationComponent } from './landslide-evacuation.component';

describe('LandslideEvacuationComponent', () => {
  let component: LandslideEvacuationComponent;
  let fixture: ComponentFixture<LandslideEvacuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandslideEvacuationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandslideEvacuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
