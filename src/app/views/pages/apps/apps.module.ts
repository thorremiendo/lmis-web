import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppsComponent } from './apps.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/inbox/inbox.component';
import { ReadComponent } from './email/read/read.component';
import { ComposeComponent } from './email/compose/compose.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

// ngx-quill
import { QuillModule } from 'ngx-quill';
import { RainGaugeComponent } from './sensor-management/rain-gauge/rain-gauge.component';
import { SensorManagementComponent } from './sensor-management/sensor-management.component';
import { SoilMoistureComponent } from './sensor-management/soil-moisture/soil-moisture.component';
import { InclinometerComponent } from './sensor-management/inclinometer/inclinometer.component';
import { AccelerometerComponent } from './sensor-management/accelerometer/accelerometer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TemperatureComponent } from './sensor-management/temperature/temperature.component';
import { RowDetailTableComponent } from './sensor-management/row-detail-table/row-detail-table.component';
import { ReportsComponent } from './reports/reports.component';
import { AlertWarningComponent } from './alert-warning/alert-warning.component';
import { RainfallComponent } from './alert-warning/rainfall/rainfall.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LandslideEvacuationComponent } from './landslide-evacuation/landslide-evacuation.component';
import { MapComponent } from './map/map.component';
import { LandslideInventoryComponent } from './landslide-inventory/landslide-inventory.component';
import { RapidRiskAssessmentComponent } from './rapid-risk-assessment/rapid-risk-assessment.component';
import { SettingsComponent } from './settings/settings.component';
import { ThresholdsComponent } from './settings/thresholds/thresholds.component';
import { LandslideRiskWarningComponent } from './landslide-risk-warning/landslide-risk-warning.component';

const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'sensors',
        component: SensorManagementComponent,
        children: [
          {
            path: '',
            redirectTo: 'rain-gauge',
            pathMatch: 'full'
          },
          {
            path: 'rain-gauge',
            component: RainGaugeComponent
          },
          {
            path: 'soil-moisture',
            component: SoilMoistureComponent
          },
          {
            path: 'temperature',
            component: TemperatureComponent
          },
          {
            path: 'inclinometer',
            component: InclinometerComponent
          },
          {
            path: 'accelerometer',
            component: AccelerometerComponent
          },
        ]
      },
      {
        path: 'alert-warning',
        component: AlertWarningComponent,
        children: [
          {
            path: '',
            redirectTo: 'rainfall',
            pathMatch: 'full'
          },
          {
            path: 'rainfall',
            component: RainfallComponent
          },
        ]
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'landslide-inventory',
        component: LandslideInventoryComponent
      },
      {
        path: 'contact-list',
        component: ContactListComponent
      },
      {
        path: 'evacuation',
        component: LandslideEvacuationComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'risk-assessment',
        component: RapidRiskAssessmentComponent
      },
      {
        path: 'landslide-risk-warning',
        component: LandslideRiskWarningComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: '',
            redirectTo: 'thresholds',
            pathMatch: 'full'
          },
          {
            path: 'thresholds',
            component: ThresholdsComponent
          },
        ]
      },
    ]
  }
]

@NgModule({
  declarations: [
    EmailComponent,
    ChatComponent,
    CalendarComponent,
    AppsComponent,
    InboxComponent,
    ReadComponent,
    ComposeComponent,
    RainGaugeComponent,
    SensorManagementComponent,
    SoilMoistureComponent,
    InclinometerComponent,
    AccelerometerComponent,
    TemperatureComponent,
    RowDetailTableComponent,
    ReportsComponent,
    AlertWarningComponent,
    RainfallComponent,
    ContactListComponent,
    LandslideEvacuationComponent,
    MapComponent,
    LandslideInventoryComponent,
    RapidRiskAssessmentComponent,
    SettingsComponent,
    ThresholdsComponent,
    LandslideRiskWarningComponent,
  ],
  imports: [
    NgbModule,
    NgApexchartsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule,
    QuillModule.forRoot(), // ngx-quill
  ],
  exports: [MapComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AppsModule { }
