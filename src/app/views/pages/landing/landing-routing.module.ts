import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Project1PageComponent } from './project1-page/project1-page.component';
import { Project2PageComponent } from './project2-page/project2-page.component';
import { LandslideReportComponent } from './landslide-report/landslide-report.component';
import { GlossaryComponent } from './glossary/glossary.component';

const routes: Routes = [
  {
    path: '',
    component:
      HomeComponent,
  },
  {
    path: 'project1',
    component:
      Project1PageComponent,
  },
  {
    path: 'project2',
    component:
      Project2PageComponent,
  },
  {
    path: 'landslide-report',
    component:
      LandslideReportComponent,
  },
  {
    path: 'glossary',
    component: GlossaryComponent,
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
