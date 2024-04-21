import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ProgramsComponent } from './home/programs/programs.component';
import { Project1Component } from './home/project1/project1.component';
import { Project2Component } from './home/project2/project2.component';
import { TeamComponent } from './home/team/team.component';
import { FooterComponent } from './home/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProgramsComponent,
    Project1Component,
    Project2Component,
    TeamComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    // MatButtonModule,
  ]
})
export class LandingModule { }
