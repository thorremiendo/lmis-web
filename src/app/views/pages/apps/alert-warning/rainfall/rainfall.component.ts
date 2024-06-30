import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SensorParams } from '../../models/sensor-params';
import { SensorSites } from '../../models/sensor-site-type.enum';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.scss']
})
export class RainfallComponent implements OnInit {
  public isLoading: boolean = false
  public rainfallPeriodTotal: number
  public selectedPeriod: any
  public periods = [
    {
      value: 1,
      title: '1hr - 24 hrs'
    },
    {
      value: 2,
      title: '1hr - 48 hrs'
    },
    {
      value: 3,
      title: '1hr - 72 hrs'
    },
    {
      value: 4,
      title: '1hr - 120 hrs'
    },
  ]
  public alertType: string
  public alertLevel: number
  public errorMessage: string = ""
  ColumnMode = ColumnMode;
  public rainfallRecording: { datetime: string, value: number }[] = [];
  public loadingIndicator = true;
  public selectedSite: any

  constructor(private sensorService: SensorsService) { }

  ngOnInit(): void {
  }


  getSite() {
    switch (this.selectedSite) {
      case 1:
        return "Sablan"
      case 2:
        return "La Trinidad"
      case 3:
        return "Tuba"
      case 4:
        return "Tublay"
      case 5:
        return "Baguio"
      case 6:
        return "Itogon"
      default:
        return "No site selected"
    }
  }

  selectSite(id: number) {
    this.selectedSite = id
  }

  onSelectPeriod(period: any) {
    this.selectedPeriod = period
  }

  convertToUTC(dateString: string): string {
    let date = new Date(dateString);
    return date.toISOString();
  }

  fetchSensorDataPeriod(id: number) {
    this.errorMessage = ""
    this.isLoading = true
    let startDate: Date;
    const endDate: Date = new Date(); // current date/time
    const device = this.selectedSite == 1 ? SensorSites.Sablan : this.selectedSite == 2 ? SensorSites.LaTrinidad : this.selectedSite == 3 ? SensorSites.Tuba : this.selectedSite == 4 ? SensorSites.Tublay : this.selectedSite == 5 ? SensorSites.Baguio : SensorSites.Itogon;

    switch (id) {
      case 1:
        startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // subtract 24 hours
        break;
      case 2:
        startDate = new Date(endDate.getTime() - 48 * 60 * 60 * 1000); // subtract 48 hours
        break;
      case 3:
        startDate = new Date(endDate.getTime() - 72 * 60 * 60 * 1000); // subtract 72 hours
        break;
      case 4:
        startDate = new Date(endDate.getTime() - 120 * 60 * 60 * 1000); // subtract 120 hours
        break;
      default:
        throw new Error("Invalid option");
    }
    console.log(startDate, endDate)
    let sensorParams: SensorParams = {
      device_sn: device,
      reading_type: "Precipitation",
      from: this.convertToUTC(startDate.toISOString()),
      until: this.convertToUTC(endDate.toISOString()),
    };

    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      this.rainfallRecording = res
      this.rainfallPeriodTotal = this.rainfallRecording.reduce((n, { value }) => n + value, 0)
      const totalRow = { datetime: 'Total', value: this.rainfallPeriodTotal };
      this.rainfallRecording.unshift(totalRow);
      this.isLoading = false
      console.log(this.rainfallRecording[0], 'last')
    }, err => {
      this.errorMessage = "Please try again."
      this.isLoading = false
    })

  }


  getRainfallAlertLevel(): any {
    const rainfall = this.rainfallPeriodTotal
    switch (this.selectedPeriod.value) {
      case 1:
        if (rainfall >= 0 && rainfall <= 113.24) {
          this.alertType = "success"
          this.alertLevel = 1
          return 'RA-0';
        } else if (rainfall > 113.24 && rainfall <= 182.56) {
          this.alertType = "warning"
          this.alertLevel = 2
          return 'RA-1';
        } else if (rainfall > 182.56 && rainfall <= 545.35) {
          this.alertType = "danger"
          this.alertLevel = 3
          return 'RA-2';
        } else if (rainfall > 545.35) {
          this.alertType = "danger"
          this.alertLevel = 4
          return 'RA-3';
        } else {
          throw new Error('Invalid rainfall amount');
        }
      case 2:
        if (rainfall >= 0 && rainfall <= 132.65) {
          this.alertType = "success"
          this.alertLevel = 1
          return 'RA-0';
        } else if (rainfall > 132.65 && rainfall <= 233.86) {
          this.alertType = "warning"
          this.alertLevel = 2
          return 'RA-1';
        } else if (rainfall > 233.86 && rainfall <= 743.02) {
          this.alertType = "danger"
          this.alertLevel = 3
          return 'RA-2';
        } else if (rainfall > 743.02) {
          this.alertType = "danger"
          this.alertLevel = 4
          return 'RA-3';
        } else {
          throw new Error('Invalid rainfall amount');
        }
      case 3:
        if (rainfall >= 0 && rainfall <= 150.53) {
          this.alertType = "success"
          this.alertLevel = 1
          return 'RA-0';
        } else if (rainfall > 150.53 && rainfall <= 264.8) {
          this.alertType = "warning"
          this.alertLevel = 2
          return 'RA-1';
        } else if (rainfall > 264.8 && rainfall <= 870.36) {
          this.alertType = "danger"
          this.alertLevel = 3
          return 'RA-2';
        } else if (rainfall > 870.36) {
          this.alertType = "danger"
          this.alertLevel = 4
          return 'RA-3';
        } else {
          throw new Error('Invalid rainfall amount');
        }
      case 4:
        if (rainfall >= 0 && rainfall <= 184.21) {
          this.alertType = "success"
          this.alertLevel = 1
          return 'RA-0';
        } else if (rainfall > 184.21 && rainfall <= 344.68) {
          this.alertType = "warning"
          this.alertLevel = 2
          return 'RA-1';
        } else if (rainfall > 344.68 && rainfall <= 1082.42) {
          this.alertType = "danger"
          this.alertLevel = 3
          return 'RA-2';
        } else if (rainfall > 1082.42) {
          this.alertType = "danger"
          this.alertLevel = 4
          return 'RA-3';
        } else {
          throw new Error('Invalid rainfall amount');
        }
    }
  }

  fakeData(value: number) {
    switch (value) {
      case 1:
        this.rainfallPeriodTotal = 101.12
        break;
      case 2:
        this.rainfallPeriodTotal = 153.32
        break;
      case 3:
        this.rainfallPeriodTotal = 432.12
        break;
      case 4:
        this.rainfallPeriodTotal = 873.45
        break;
      default:
        break;
    }
  }

}

function toLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, -1);
  return localISOTime;
}