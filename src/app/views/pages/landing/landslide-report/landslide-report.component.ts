import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { time } from 'console';
import { DataService } from 'src/app/core/services/data.service';
import { SwalService } from 'src/app/core/services/swal.service';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-landslide-report',
  templateUrl: './landslide-report.component.html',
  styleUrls: ['./landslide-report.component.scss']
})
export class LandslideReportComponent implements OnInit {
  public isLoading: boolean = false
  selectedDate: NgbDateStruct;
  selectedTime: string;
  remarks: string = '';
  barangays = []
  municipalities = []
  selectedBarangay
  selectedMunicipality
  reportForm: FormGroup
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/satellite-streets-v11';
  lat = 16.416665;
  lng = 120.5999976;
  zoom = 15;
  public currentMarkers = [];


  public config: DropzoneConfigInterface = {
    url: 'localhost:3000',
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private dataService: DataService, private swalService: SwalService) {
    this.selectToday();
    mapboxgl.accessToken = environment.mapboxToken;
  }

  ngOnInit(): void {
    this.buildMap()
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
    })

    this.reportForm = this.fb.group({
      date: new FormControl(""),
      time: new FormControl(""),
      remarks: new FormControl(""),
      barangay: new FormControl(""),
      municipality: new FormControl("")
    })
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.flyTo(position.coords.longitude, position.coords.latitude)
        })
      }
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
      console.log(this.lng, this.lat)
    });
  }

  //date & time
  selectToday() {
    this.selectedDate = this.calendar.getToday();
    const now = new Date();
    this.selectedTime = now.toTimeString().slice(0, 5);
  }

  //location
  selectBarangay(barangay) {
    this.selectedBarangay = barangay;
    this.reportForm.patchValue({ barangay: barangay.id });
  }

  selectMunicipality(municipality) {
    this.selectedMunicipality = municipality;
    console.log(this.selectedMunicipality)
    switch (this.selectedMunicipality.id) {
      case 1:
        this.flyTo(this.lng, this.lat)
        break;
      case 2:
        this.flyTo(120.5871402, 16.4497758)
        break;
      case 3:
        this.flyTo(120.6745745, 16.3602709)
        break;
      case 4:
        this.flyTo(120.4846661, 16.4972634)
        break;
      case 5:
        this.flyTo(120.558347, 16.392593)
        break;
      case 6:
        this.flyTo(120.6301044, 16.4746997)
        break;
      default:
        break;
    }
    this.reportForm.patchValue({ municipality: municipality.id });
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res
    })
  }


  //file upload
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  //form data
  submitForm() {
    this.isLoading = true
    const { date, time, municipality, barangay, remarks } = this.reportForm.controls
    const body = {
      "dateOfIncident": this.convertToISODate(date.value),
      "timeOfIncident": time.value,
      "municipalityId": municipality.value,
      "barangayId": barangay.value,
      "remarks": remarks.value,
      "longitude": this.lng,
      "latitude": this.lat
    }

    this.dataService.submitReport(body).subscribe(res => {
      this.swalService.showSuccess()
      this.isLoading = false
      window.location.reload()
    })
  }

  convertToISODate(dateObj: { year: number, month: number, day: number }): string {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return date.toISOString();
  }
}


