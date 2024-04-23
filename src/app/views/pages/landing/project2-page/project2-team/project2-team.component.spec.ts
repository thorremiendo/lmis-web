import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project2TeamComponent } from './project2-team.component';

describe('Project2TeamComponent', () => {
  let component: Project2TeamComponent;
  let fixture: ComponentFixture<Project2TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project2TeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project2TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
