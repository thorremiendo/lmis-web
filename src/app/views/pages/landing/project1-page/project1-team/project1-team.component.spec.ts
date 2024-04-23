import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project1TeamComponent } from './project1-team.component';

describe('Project1TeamComponent', () => {
  let component: Project1TeamComponent;
  let fixture: ComponentFixture<Project1TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project1TeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project1TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
