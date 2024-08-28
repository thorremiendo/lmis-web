import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SensorsService } from '../apps/services/sensors.service';
import { SensorParams } from '../apps/models/sensor-params';
import { SensorSites } from '../apps/models/sensor-site-type.enum';
import { SwalService } from 'src/app/core/services/swal.service';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';
import { ChartService } from 'src/app/core/services/chart.service';
import { ChartData } from 'chart.js';
import { start } from 'repl';
import { ThresholdService } from 'src/app/core/services/threshold.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {
  public isAlertOpened: boolean = false
  public rainFallAlertLevel: string
  public soilMoistureAlertLevel: string = 'S-0'
  public landSlideAlertLevel: string = 'LA-0'
  public isObservation = true
  public selectedSensor: any
  public rainfallRecording = [];
  public rainfallPeriodTotal: any
  public soilMoistureAverage: any
  public calculatedSoilMoisture: any
  public soilMoistureRecording = [];
  public soilMoistureTotal: any
  public isLoading: boolean = false
  public errorMessage: string = ""
  public alertLevel: number
  public sensors = [
    {
      value: 0,
      title: 'All',
    },
    {
      value: 1,
      title: 'Purok 10, Dontogan',
      coords: [120.5683764, 16.3731997]
    },
    {
      value: 2,
      title: 'Sitio Little Kibungan, Puguis',
      coords: [120.5710988, 16.4461463]
    },
    {
      value: 3,
      title: 'Sitio Manganese, Ampucao',
      coords: [120.6331639, 16.3459756]
    },
    {
      value: 4,
      title: 'Sitio Kalipkip, Banangan',
      coords: [120.5189059, 16.4753295]
    },
    {
      value: 5,
      title: 'Kiangan Village, Camp 3',
      coords: [120.5921309, 16.2899291]
    },
    {
      value: 6,
      title: 'Sitio Tabeyo, Ambassador',
      coords: [120.6656292, 16.4908632]
    },
  ]
  public period = [
    {
      name: '1 day',
      value: 1
    },
    {
      name: '1 week',
      value: 2
    },
    {
      name: '1 month',
      value: 3
    },
    {
      name: 'Select Range',
      value: 4
    }
  ]
  public observationPeriod = [
    {
      name: '1hr - 24 hrs',
      value: 1
    },
    {
      name: '1hr - 48hrs',
      value: 2
    },
    {
      name: '1hr - 72hrs',
      value: 3
    },
    {
      name: '1hr - 120hrs',
      value: 4
    }
  ]
  public barChartData
  public barChartOptions
  public barChartPlugins
  public barChartType
  public lineChartData
  public lineChartOptions
  public lineChartType
  public lineChartPlugins
  public soilMoistureChartData
  public soilMoistureBarChartData
  public eprProtocol = [
    {
      title: "Standby",
      description: "No to Very Low Risk"
    },
    {
      title: "Alpha",
      description: "Low Risk"
    },
    {
      title: "Bravo",
      description: "Moderate Risk"
    },
    {
      title: "Charlie",
      description: "High Risk"
    },
  ]
  public selectedEpr;
  public evacuationStatus
  public evacuationLevel
  public submitting = false
  public evacuationLevelId
  from: any;
  until: any
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/satellite-streets-v11';
  lat = 16.416665;
  lng = 120.5999976;
  zoom = 15;
  public currentMarkers = [];
  public rainfallChartOptions: any = {};
  public selectedPeriod: any
  public selectedObservation: any
  currentDate: NgbDateStruct;
  public userDetails;
  public recommendations = ["Pre-emptive Evacuation", "Forced Evacuation", "Status Quo"]
  public rainFallThresholds
  @ViewChild('mayorModal') mayorModal: TemplateRef<any>;
  @ViewChild('scrollableModal') scrollableModal: TemplateRef<any>;
  public recommendationControl = new FormControl()
  public mayorPassword = new FormControl()
  public rainfall24PeriodTotal
  constructor(
    private calendar: NgbCalendar,
    private sensorService: SensorsService,
    private swal: SwalService,
    public formatter: NgbDateParserFormatter,
    private chartService: ChartService,
    private threshold: ThresholdService,
    private router: Router,
    private modalService: NgbModal,
    private dataService: DataService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('lmisUser'))
    this.barChartData = this.chartService.barChartData
    this.barChartOptions = this.chartService.barChartOptions
    this.barChartPlugins = this.chartService.barChartPlugins
    this.barChartType = this.chartService.barChartType
    this.lineChartData = this.chartService.lineChartData
    this.lineChartOptions = this.chartService.lineChartOptions
    this.lineChartType = this.chartService.lineChartType
    this.lineChartPlugins = this.chartService.lineChartPlugins
    this.soilMoistureChartData = this.chartService.soilMoistureChartData
    this.soilMoistureBarChartData = this.chartService.soilMoistureBarChartData
    this.toDate = calendar.getToday();
    this.fromDate = calendar.getPrev(this.toDate, 'd', 7);
    this.from = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.until = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    mapboxgl.accessToken = environment.mapboxToken;
  }

  ngOnInit(): void {
    this.isAlertOpened = false
    if (!this.userDetails) {
      this.router.navigate(['/home'])
    }
    if (this.userDetails.role === 'Others') {
      this.router.navigate(['/apps/evacuation'])
    }
    this.selectedSensor = this.sensors[1]
    this.selectedPeriod = this.period[0]
    this.selectedObservation = this.observationPeriod[0]
    this.currentDate = this.calendar.getToday();
    this.buildMap()
    this.sensors.forEach((site) => {
      if (site.coords) {
        new mapboxgl.Marker()
          .setLngLat([site.coords[0], site.coords[1]])
          .addTo(this.map);
      }
    })
    this.dataService.getRainfallThresholds().subscribe((data: any) => {
      this.rainFallThresholds = data
      this.fetchSensorDataPeriod()

    })
  }

  submitRecommendation() {
    const alertLevel = this.landSlideAlertLevel === 'LA-1' ? 1 : this.landSlideAlertLevel === 'LA-2' ? 2 : this.landSlideAlertLevel === 'LA-3' ? 3 : 0
    const body = {
      recommendation: alertLevel,
      remarks: this.recommendationControl.value,
    }
    this.dataService.updateAlertWarning(body).subscribe(res => {
      this.swal.showSuccessMessage("Recommendation Forwarded!")
      setTimeout(() => {
        this.modalService.dismissAll()
      }, 1000);
    })

  }

  mayorSubmit() {
    console.log(this.mayorPassword.value)
    if (this.mayorPassword.value == 'secret') {
      this.sendNotification()
    }
  }

  triggerAlert(alertLevel) {
    this.isAlertOpened = true
    if (this.userDetails) {
      switch (alertLevel) {
        case "LA-1":
          this.selectedEpr = this.eprProtocol[1]
          console.log(this.selectedEpr)
          break;
        case "LA-2":
          this.selectedEpr = this.eprProtocol[2]
          console.log(this.selectedEpr)
          break;
        case "LA-3":
          this.selectedEpr = this.eprProtocol[3]
          console.log(this.selectedEpr)
          break;
        default:
          break;
      }
      this.rainFallAlertLevel = this.threshold.determineRainfallAlertLevel(this.selectedObservation.value, this.rainfallPeriodTotal, this.rainFallThresholds)
      this.soilMoistureAlertLevel = this.threshold.determineSoilMoistureWarningRange(this.selectedSensor.value, this.calculatedSoilMoisture)
      this.landSlideAlertLevel = this.threshold.getLandslideAlertLevel(this.rainFallAlertLevel, this.soilMoistureAlertLevel)
      if (this.userDetails.role === 'LGA') {
        setTimeout(() => {
          this.modalService.open(this.scrollableModal, { scrollable: true }).result.then((result) => {
            console.log("Modal closed" + result);
            this.isAlertOpened = false
          }).catch((res) => { });
        }, 1000);
      } else if (this.userDetails.username === 'lmis-mayor') {
        this.dataService.getAlertWarningById().subscribe(res => {
          this.evacuationLevelId = res.recommendation
          this.evacuationStatus = res.remarks
          this.evacuationLevel = res.recommendation === 1 ? "Alpha - Low Risk" : res.recommendation === 2 ? "Bravo - Moderate Risk" : res.recommendation === 3 ? "Charlie - High Risk" : "Standby - No to Very Low Risk"
          setTimeout(() => this.modalService.open(this.mayorModal), 2000);
        }
        )
      }
    }

  }



  fetchSensorDataPeriod() {
    this.barChartData.labels = []
    this.barChartData.datasets[0].data = []
    this.lineChartData.labels = []
    this.lineChartData.datasets[0].data = []
    this.soilMoistureChartData.labels = []
    this.soilMoistureChartData.datasets[0].data = []
    this.soilMoistureBarChartData.labels = []
    this.soilMoistureBarChartData.datasets[0].data = []
    this.errorMessage = ""
    this.isLoading = true
    let startDate: Date
    let endDate: Date
    this.fetch24hourRainfall(new Date(new Date().setHours(new Date().getHours() - 24)), new Date())
    if (!this.isObservation) {
      if (this.selectedPeriod.value == 4) { //DATE RANGE
        startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      } else if (this.selectedPeriod.value == 1) { //1 DAY
        startDate = new Date(new Date().setDate(new Date().getDate() - 1));
        endDate = new Date();
      } else if (this.selectedPeriod.value == 2) {//1 WEEK
        startDate = new Date(new Date().setDate(new Date().getDate() - 7));
        endDate = new Date();
      } else if (this.selectedPeriod.value == 3) {//1 MONTH
        startDate = new Date(new Date().setDate(new Date().getDate() - 30));
        endDate = new Date();
      }
    } else {
      if (this.selectedObservation.value == 1) {
        startDate = new Date(new Date().setHours(new Date().getHours() - 24));
        endDate = new Date();
      } else if (this.selectedObservation.value == 2) {
        startDate = new Date(new Date().setHours(new Date().getHours() - 48));
        endDate = new Date();
      } else if (this.selectedObservation.value == 3) {
        startDate = new Date(new Date().setHours(new Date().getHours() - 72));
        endDate = new Date();
      } else if (this.selectedObservation.value == 4) {
        startDate = new Date(new Date().setHours(new Date().getHours() - 120));
        endDate = new Date();
      }
    }

    if (this.selectedSensor.value !== 0) {
      //SPECIFIC SITES
      this.fetchRainfallData(startDate, endDate)
      this.fetchSoilMoisture(startDate, endDate)
    } else {
      //ALL SITES
      this.fetchAllRainfallData(startDate, endDate)
      this.fetchAllSoilMoisture(startDate, endDate)
    }
  }

  fetchAllRainfallData(startDate, endDate) {
    this.rainfallPeriodTotal = 0
    const devices = [SensorSites.Baguio, SensorSites.LaTrinidad, SensorSites.Itogon, SensorSites.Sablan, SensorSites.Tuba, SensorSites.Tublay]
    const apiCalls = devices.map((deviceNumber) =>
      this.sensorService.getSensorData({
        device_sn: deviceNumber,
        reading_type: "Precipitation",
        from: this.convertToUTC(startDate.toISOString()),
        until: this.convertToUTC(endDate.toISOString()),
      })
    );
    forkJoin(apiCalls).subscribe(results => {
      const total = results.map(rainfallRecordings =>
        parseFloat(rainfallRecordings.reduce((total, { value }) => total + value, 0).toFixed(2))
      );
      this.rainfallPeriodTotal = total.reduce((total, current) => total + current, 0).toFixed(2)
      total.forEach((rainfall) => {
        this.barChartData.datasets[0].data.push(rainfall)
        // this.barChartData.datasets[0].backgroundColor.push(this.threshold.getAlertLevelColor(this.threshold.determineRainfallAlertLevel('1-24', rainfall)))
      })
      devices.forEach((device) => {
        this.barChartData.labels.push(this.chartService.getKeyByValue(device))
      })
      this.rainFallAlertLevel = this.threshold.determineRainfallAlertLevel(this.selectedObservation.value, this.rainfallPeriodTotal, this.rainFallThresholds)
      this.landSlideAlertLevel = this.threshold.getLandslideAlertLevel(this.rainFallAlertLevel, this.soilMoistureAlertLevel)
      this.isLoading = false
    });
  }

  fetch24hourRainfall(startDate, endDate) {
    let recording = []
    const device = this.selectedSensor.value == 1 ? SensorSites.Baguio : this.selectedSensor.value == 2 ? SensorSites.LaTrinidad : this.selectedSensor.value == 3 ? SensorSites.Itogon : this.selectedSensor.value == 4 ? SensorSites.Sablan : this.selectedSensor.value == 5 ? SensorSites.Tuba : SensorSites.Tublay;
    let sensorParams: SensorParams = {
      device_sn: device,
      reading_type: "Precipitation",
      from: this.convertToUTC(startDate.toISOString()),
      until: this.convertToUTC(endDate.toISOString()),
    };
    //RAINFALL AMOUNT
    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      recording = res
      this.rainfall24PeriodTotal = parseFloat(recording.reduce((n, { value }) => n + value, 0).toFixed(2))
      if (this.rainfall24PeriodTotal > 70) {
        this.swal.showWarning("24-hour Rainfall Amount is greater than 70mm", "Rainfall Alert", "Close")
      }

      this.isLoading = false
    }, err => {
      this.errorMessage = "Please try again."
      this.isLoading = false
    })
  }

  fetchRainfallData(startDate, endDate) {
    this.rainfallRecording = []
    const device = this.selectedSensor.value == 1 ? SensorSites.Baguio : this.selectedSensor.value == 2 ? SensorSites.LaTrinidad : this.selectedSensor.value == 3 ? SensorSites.Itogon : this.selectedSensor.value == 4 ? SensorSites.Sablan : this.selectedSensor.value == 5 ? SensorSites.Tuba : SensorSites.Tublay;
    let sensorParams: SensorParams = {
      device_sn: device,
      reading_type: "Precipitation",
      from: this.convertToUTC(startDate.toISOString()),
      until: this.convertToUTC(endDate.toISOString()),
    };
    //RAINFALL AMOUNT
    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      this.rainfallRecording = res
      this.rainfallPeriodTotal = parseFloat(this.rainfallRecording.reduce((n, { value }) => n + value, 0).toFixed(2))
      if (!this.currentMarkers.length && this.selectedSensor.value !== 0) {
        this.buildMap()
        this.flyTo(this.selectedSensor.coords[0], this.selectedSensor.coords[1])
      }
      this.rainfallRecording.forEach((rainfall) => {
        this.lineChartData.labels.push(rainfall.datetime)
        this.lineChartData.datasets[0].data.push(rainfall.value)
        this.lineChartData.datasets[0].label = this.chartService.getKeyByValue(device)
      })
      this.rainFallAlertLevel = this.threshold.determineRainfallAlertLevel(this.selectedObservation.value, this.rainfallPeriodTotal, this.rainFallThresholds)
      this.landSlideAlertLevel = this.threshold.getLandslideAlertLevel(this.rainFallAlertLevel, this.soilMoistureAlertLevel)
      // if (this.landSlideAlertLevel !== 'LA-0' && this.landSlideAlertLevel !== undefined && this.landSlideAlertLevel !== 'Unknown') {
      //   if (!this.isAlertOpened) {
      //     this.triggerAlert(this.landSlideAlertLevel)
      //   }
      // }
      this.isLoading = false
    }, err => {
      this.errorMessage = "Please try again."
      this.isLoading = false
    })
  }

  fetchSoilMoisture(startDate, endDate) {
    this.soilMoistureRecording = []
    const device = this.selectedSensor.value == 1 ? SensorSites.Baguio : this.selectedSensor.value == 2 ? SensorSites.LaTrinidad : this.selectedSensor.value == 3 ? SensorSites.Itogon : this.selectedSensor.value == 4 ? SensorSites.Sablan : this.selectedSensor.value == 5 ? SensorSites.Tuba : SensorSites.Tublay;
    let sensorParams: SensorParams = {
      device_sn: device,
      reading_type: "Raw VWC",
      from: this.convertToUTC(startDate.toISOString()),
      until: this.convertToUTC(endDate.toISOString()),
    };
    //SOIL MOISTURE AMOUNT
    this.sensorService.getSensorData(sensorParams).subscribe(res => {
      this.soilMoistureRecording = res
      this.soilMoistureAverage = parseFloat(
        (this.soilMoistureRecording.reduce((n, { value }) => n + value, 0) / this.soilMoistureRecording.length).toFixed(2)
      );
      this.calculatedSoilMoisture = this.threshold.calculateSoilMoisture(this.selectedSensor.value, this.soilMoistureAverage).toFixed(2)
      this.soilMoistureRecording.forEach((rainfall) => {
        this.soilMoistureChartData.labels.push(rainfall.datetime)
        this.soilMoistureChartData.datasets[0].data.push(rainfall.value)
        this.soilMoistureChartData.datasets[0].label = this.chartService.getKeyByValue(device)
      })
      this.soilMoistureAlertLevel = this.threshold.determineSoilMoistureWarningRange(this.selectedSensor.value, this.calculatedSoilMoisture)
      this.landSlideAlertLevel = this.threshold.getLandslideAlertLevel(this.rainFallAlertLevel, this.soilMoistureAlertLevel)
      if (this.landSlideAlertLevel !== 'LA-0' && this.landSlideAlertLevel !== undefined && this.landSlideAlertLevel !== 'Unknown') {
        if (!this.isAlertOpened) {
          this.triggerAlert(this.landSlideAlertLevel)
        }
      }
      this.isLoading = false
    }, err => {
      this.errorMessage = "Please try again."
      this.isLoading = false
    })
  }

  fetchAllSoilMoisture(startDate, endDate) {
    this.calculatedSoilMoisture = 0

    const devices = [SensorSites.Baguio, SensorSites.LaTrinidad, SensorSites.Itogon, SensorSites.Sablan, SensorSites.Tuba, SensorSites.Tublay]
    const apiCalls = devices.map((deviceNumber) =>
      this.sensorService.getSensorData({
        device_sn: deviceNumber,
        reading_type: "Raw VWC",
        from: this.convertToUTC(startDate.toISOString()),
        until: this.convertToUTC(endDate.toISOString()),
      })
    );
    forkJoin(apiCalls).subscribe(results => {
      const averages = results.map(soilMoistureRecording =>
        parseFloat((soilMoistureRecording.reduce((total, { value }) => total + value, 0) / soilMoistureRecording.length).toFixed(2))
      );
      let calculated = []
      averages.forEach((e, index) => {
        calculated.push(parseFloat(this.threshold.calculateSoilMoisture(index + 1, e).toFixed(2)))
        if (index == averages.length - 1) {
          this.calculatedSoilMoisture = parseFloat((calculated.reduce((total, current) => total + current, 0) / calculated.length).toFixed(2))
          calculated.forEach((rainfall) => {
            this.soilMoistureBarChartData.datasets[0].data.push(rainfall)
          })
          devices.forEach((device) => {
            this.soilMoistureBarChartData.labels.push(this.chartService.getKeyByValue(device))
          })
        }
      })
    });
  }

  convertToUTC(dateString: string): string {
    let date = new Date(dateString);
    return date.toISOString();
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
    this.from = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.until = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.fetchSensorDataPeriod()
  }

  onSelectSite(sensor: any) {
    this.isLoading = true
    this.selectedSensor = sensor
    this.fetchSensorDataPeriod()
  }

  onSelectPeriod(e) {
    this.selectedPeriod = e
    this.fetchSensorDataPeriod()
  }

  onSelectObservation(e) {
    this.selectedObservation = e
    this.fetchSensorDataPeriod()
  }

  onObsevationChange(e) {
    this.fetchSensorDataPeriod()
  }

  getAlertDescription() {
    return this.threshold.getAlertDescription(this.landSlideAlertLevel)
  }

  getRainfallAlertLevel(): any {
    const rainfall = this.rainfallPeriodTotal
    if (rainfall >= 0 && rainfall <= 113.24) {
      this.alertLevel = 1
      return 'RA-0';
    } else if (rainfall > 113.24 && rainfall <= 182.56) {
      this.alertLevel = 2
      return 'RA-1';
    } else if (rainfall > 182.56 && rainfall <= 545.35) {
      this.alertLevel = 3
      return 'RA-2';
    } else if (rainfall > 545.35) {
      this.alertLevel = 4
      return 'RA-3';
    } else {
      throw new Error('Invalid rainfall amount');
    }
  }


  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {

    })
  }

  removeMarker() {
    if (this.currentMarkers !== null) {
      for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
        this.currentMarkers[i].remove();
      }
    }
  }

  flyTo(x, y) {
    this.removeMarker()
    this.map.flyTo({
      center: [x, y],
      essential: true,
    });
    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([x, y])
      .addTo(this.map);
    this.currentMarkers.push(this.marker);
    this.marker.on('dragend', (e) => {
      this.lng = e.target._lngLat.lng;
      this.lat = e.target._lngLat.lat;
    });
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

  dateToReadable(datetime) {
    const date = new Date(datetime);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Use 24-hour format. Set to true for 12-hour format.
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }


  sendNotification() {
    this.submitting = true
    this.dataService.getContacts().subscribe((res: any) => {
      res.forEach((contact, index) => {
        const message =
          this.evacuationLevelId === 1 ? "ALERT: Landslide Risk Level Alpha (Low Risk). Stay informed and be cautious of your surroundings. No immediate danger, but remain vigilant. " :
            this.evacuationLevelId === 2 ? "ALERT: Landslide Risk Level Bravo (Moderate Risk). Be prepared to evacuate. Prepare your emergency kit and be ready to leave. " :
              this.evacuationLevelId === 3 ? "ALERT: Landslide Risk Level Charlie (High Risk). Evacuate immediately. " : "ALERT: Landslide Risk Level Standby (No to Very Low Risk). No immediate danger. Stay informed and be cautious of your surroundings. "
        const body = {
          "contactNumber": contact.contactNumber,
          "body": message,
          "sender": this.userDetails.firstName + this.userDetails.lastName
        }
        this.dataService.createNotification(body).subscribe(data => {
          if (index == res.length - 1) {
            this.submitting = false
            this.swal.showSuccessMessage("Notifications sent successfully")
            setTimeout(() => {
              this.modalService.dismissAll()
            }, 1000);
          }
        })
      })
    })
  }
}





