import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { SensorParams } from '../../models/sensor-params';
import { SensorSites } from '../../models/sensor-site-type.enum';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-soil-moisture',
  templateUrl: './soil-moisture.component.html',
  styleUrls: ['./soil-moisture.component.scss']
})
export class SoilMoistureComponent implements OnInit {
  selectedSite: any
  public sensorDetails: any
  public isLoading: boolean = false
  public errorMessage: string = ""
  countdown: number = 0;

  waterContentRows = [];
  soilTempRows = [];
  saturationExtractRows = []
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  public waterContentOptions: any = {};
  public soilTempOptions: any = {};
  public saturationExtOptions: any = {};


  obj = {
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

  convertToUTC(dateObj: { year: number, month: number, day: number }): string {
    let date = new Date(Date.UTC(dateObj.year, dateObj.month - 1, dateObj.day));
    return date.toISOString();
  }

  getSensorData() {
    this.isLoading = true
    const device = this.selectedSite == 1 ? SensorSites.Sablan : this.selectedSite == 2 ? SensorSites.LaTrinidad : this.selectedSite == 3 ? SensorSites.Tuba : this.selectedSite == 4 ? SensorSites.Tublay : this.selectedSite == 5 ? SensorSites.Baguio : SensorSites.Itogon;

    const waterContentParams: SensorParams = {
      device_sn: device,
      reading_type: "Water Content",
      from: this.convertToUTC(this.fromDate),
      until: this.convertToUTC(this.toDate),
    };
    const soilTempParams: SensorParams = {
      device_sn: device,
      reading_type: "Soil Temperature",
      from: this.convertToUTC(this.fromDate),
      until: this.convertToUTC(this.toDate),
    };
    const saturationExtParams: SensorParams = {
      device_sn: device,
      reading_type: "Saturation Extract EC",
      from: this.convertToUTC(this.fromDate),
      until: this.convertToUTC(this.toDate),
    };

    forkJoin([this.sensorService.getSensorData(waterContentParams), this.sensorService.getSensorData(soilTempParams), this.sensorService.getSensorData(saturationExtParams)])
      .subscribe(([waterContent, soilTemp, saturationExt]) => {
        this.waterContentRows = waterContent
        this.soilTempRows = soilTemp
        this.saturationExtractRows = saturationExt
        this.waterContentOptions = getOptions(this.obj, this.waterContentRows, "Water Content");
        this.soilTempOptions = getOptions(this.obj, this.soilTempRows, "Soil Temperature");
        this.saturationExtOptions = getOptions(this.obj, this.saturationExtractRows, "Saturation Extract EC");

        this.isLoading = false
      }, err => {
        this.errorMessage = err.message
        this.isLoading = false
      })
  }
}

function getOptions(obj: any, data: any[], name: string) {
  const dataValues = data.map(item => item.value);
  const categories = data.map(item => item.datetime);

  return {
    series: [
      {
        name: name,
        data: dataValues
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