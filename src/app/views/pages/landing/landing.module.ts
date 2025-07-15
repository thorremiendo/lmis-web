import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { ProgramsComponent } from './home/programs/programs.component';
import { Project1Component } from './home/project1/project1.component';
import { Project2Component } from './home/project2/project2.component';
import { TeamComponent } from './home/team/team.component';
import { Project1PageComponent } from './project1-page/project1-page.component';
import { Project2PageComponent } from './project2-page/project2-page.component';
import { OverviewComponent } from './project1-page/overview/overview.component';
import { GoalsComponent } from './project1-page/goals/goals.component';
import { GalleryComponent } from './project1-page/gallery/gallery.component';
import { Project1TeamComponent } from './project1-page/project1-team/project1-team.component';
import { Overview2Component } from './project2-page/overview2/overview2.component';
import { Goals2Component } from './project2-page/goals2/goals2.component';
import { Gallery2Component } from './project2-page/gallery2/gallery2.component';
import { Project2TeamComponent } from './project2-page/project2-team/project2-team.component';
import { LightboxModule } from 'ngx-lightbox';
import { LandslideReportComponent } from './landslide-report/landslide-report.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { GlossaryComponent } from './glossary/glossary.component';
import { LandingNavbarComponent } from './shared/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './shared/landing-footer/landing-footer.component';
import { ProjectsSectionComponent } from './home/projects-section/projects-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProgramsComponent,
    Project1Component,
    Project2Component,
    TeamComponent,
    Project1PageComponent,
    Project2PageComponent,
    OverviewComponent,
    GoalsComponent,
    GalleryComponent,
    Project1TeamComponent,
    Overview2Component,
    Goals2Component,
    Gallery2Component,
    Project2TeamComponent,
    LandslideReportComponent,
    GlossaryComponent,
    LandingNavbarComponent,
    LandingFooterComponent,
    ProjectsSectionComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LightboxModule,
    NgbModule,
    NgbDatepickerModule,
    DropzoneModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [LandingNavbarComponent],
})
export class LandingModule { }
