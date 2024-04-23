import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project2PageComponent } from './project2-page.component';

describe('Project2PageComponent', () => {
  let component: Project2PageComponent;
  let fixture: ComponentFixture<Project2PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project2PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
