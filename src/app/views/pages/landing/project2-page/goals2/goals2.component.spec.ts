import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Goals2Component } from './goals2.component';

describe('Goals2Component', () => {
  let component: Goals2Component;
  let fixture: ComponentFixture<Goals2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Goals2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Goals2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
