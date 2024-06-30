import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandslideInventoryComponent } from './landslide-inventory.component';

describe('LandslideInventoryComponent', () => {
  let component: LandslideInventoryComponent;
  let fixture: ComponentFixture<LandslideInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandslideInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandslideInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
