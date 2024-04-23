import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project1PageComponent } from './project1-page.component';

describe('Project1PageComponent', () => {
  let component: Project1PageComponent;
  let fixture: ComponentFixture<Project1PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project1PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
