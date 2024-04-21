import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { SensorParams } from '../../models/sensor-params';
import { SensorSites } from '../../models/sensor-site-type.enum';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rain-gauge',
  templateUrl: './rain-gauge.component.html',
  styleUrls: ['./rain-gauge.component.scss']
})
export class RainGaugeComponent implements OnInit {
  public selectedSite: any
  public sensorDetails: any
  public isLoading: boolean = false
  public errorMessage: string = ""
  public countdown: number = 0;
  public selectedPeriod: any
  public rainfallRecording: { datetime: string, value: number }[] = [];
  public precipitationRows = [];
  public maxPreciptationRows = [];
  public loadingIndicator = true;
  public reorderable = true;
  public rainfallPeriodTotal: number
  public alertType: string = "warning"
  ColumnMode = ColumnMode;

  public lineChartOptions: any = {};

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

  public obj = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff",
    fontFamily: "'Roboto', Helvetica, sans-serif"
  }


  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private sensorService: SensorsService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    console.log(this.fromDate, this.toDate)
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  convertToDate(obj: any): string {
    const date = new Date(obj.year, obj.month - 1, obj.day);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day} 00:00`;
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

  getSensorData() {
    this.isLoading = true
    this.countdown = 60
    let sensorParams: SensorParams = {
      device_sn: "",
      start_date: this.convertToDate(this.fromDate),
      end_date: this.convertToDate(this.toDate),
      output_format: 'json',
      page_num: 1,
      per_page: 500,
      device_depth: true,
      sort_by: 'descending'
    };
    sensorParams.device_sn = this.selectedSite == 1 ? SensorSites.Sablan : this.selectedSite == 2 ? SensorSites.LaTrinidad : this.selectedSite == 3 ? SensorSites.Tuba : SensorSites.Tublay;
    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      let countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
      this.sensorDetails = res
      this.precipitationRows = this.sensorDetails["Precipitation"][0].readings
      this.maxPreciptationRows = this.sensorDetails["Max Precip Rate"][0].readings
      this.lineChartOptions = getLineChartOptions(this.obj, this.precipitationRows, this.maxPreciptationRows);

      this.isLoading = false
    }, err => {
      this.errorMessage = err.message
      this.isLoading = false
    })
  }

  fetchSensorDataPeriod(id: number) {
    this.isLoading = true
    let startDate: Date;
    const endDate: Date = new Date(); // current date/time

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

    let sensorParams: SensorParams = {
      device_sn: "",
      start_date: toLocalISOString(startDate),
      end_date: toLocalISOString(endDate),
      output_format: 'json',
      page_num: 1,
      per_page: 500,
      device_depth: true,
      sort_by: 'descending'
    };

    sensorParams.device_sn = this.selectedSite == 1 ? SensorSites.Sablan : this.selectedSite == 2 ? SensorSites.LaTrinidad : this.selectedSite == 3 ? SensorSites.Tuba : SensorSites.Tublay;
    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      this.rainfallRecording = res["Precipitation"][0].readings
      this.rainfallPeriodTotal = this.rainfallRecording.reduce((n, { value }) => n + value, 0)
      const totalRow = { datetime: 'Total', value: this.rainfallPeriodTotal };

      this.rainfallRecording.unshift(totalRow);
      this.isLoading = false
    })

  }


}

function getLineChartOptions(obj: any, precipitationData: any[], maxPrecipitationData: any[]) {
  const precipitationValues = precipitationData.map(item => item.value);
  const maxPrecipitationValues = maxPrecipitationData.map(item => item.value);
  const categories = precipitationData.map(item => item.datetime);

  return {
    series: [
      {
        name: "Precipitation",
        data: precipitationValues
      },
      {
        name: "Max Precipitation",
        data: maxPrecipitationValues
      },
    ],
    chart: {
      type: "line",
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary, obj.danger, obj.warning],
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: "datetime",
      categories: categories,
      lines: {
        show: true
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
  }
};

function toLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, -1);
  return localISOTime;
}