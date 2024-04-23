import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDetailTableComponent } from './row-detail-table.component';

describe('RowDetailTableComponent', () => {
  let component: RowDetailTableComponent;
  let fixture: ComponentFixture<RowDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowDetailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
