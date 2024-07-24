import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataService } from 'src/app/core/services/data.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landslide-inventory',
  templateUrl: './landslide-inventory.component.html',
  styleUrls: ['./landslide-inventory.component.scss']
})
export class LandslideInventoryComponent implements OnInit {
  public reportsData = []
  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  public selectedRow
  public form: FormGroup
  public actions = ["Ongoing", "Resolved", "Others"]
  public landslideCategories = [
    {
      name: "Rockfall",
      value: 1
    },
    {
      name: "Block Slide",
      value: 2
    },
    {
      name: "Debris Flow",
      value: 3
    },
    {
      name: "Debris Avalanche",
      value: 4
    },
    {
      name: "Creep",
      value: 5
    },
    {
      name: "Rotational",
      value: 6
    },
    {
      name: "Translational",
      value: 7
    },
    {
      name: "Topple",
      value: 8
    },
    {
      name: "Earth Flow",
      value: 9
    },
    {
      name: "Lateral Spread",
      value: 10
    },

  ]

  public susceptibility = [
    {
      name: "High",
      value: 1,
    },
    {
      name: "Medium",
      value: 2,
    },
    {
      name: "Low",
      value: 3,
    },
  ]

  public status = [
    {
      name: "Unverified",
      value: 0
    },
    {
      name: "Verified",
      value: 1
    },
  ]

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 16.3773406;
  lng: number = 120.5585654;

  constructor(private dataService: DataService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.fb.group({
      dateOfIncident: [''],
      timeOfIncident: [''],
      dateReported: [''],
      municipalityId: [null],
      barangayId: [null],
      latitude: [null],
      longitude: [null],
      approvedBy: [null],
      builtUpAreas: [null],
      displaced: [null],
      injured: [null],
      dead: [null],
      category: [null],
      triggerMechanism: [null],
      remarks: [''],
      landslideSusceptibility: [null],
      floodingSusceptibility: [null],
      photo: [null],
      actionsTaken: [null],
    });
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxToken,
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat],
      attributionControl: false,
      projection: {
        name: 'globe'
      }
    });

    this.dataService.getVerifiedReports().subscribe(res => {
      this.reportsData = res.data
      //add a new field municipalityName to items in reportsdata
      this.reportsData.forEach(e => {
        e.municipalityName = e.Municipality.name
        e.barangayName = e.Barangay.name
      })

      this.map.on('load', () => {
        this.reportsData.forEach((site) => {
          if (site.latitude && site.longitude) {
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundImage = 'url(https://w7.pngwing.com/pngs/498/918/png-transparent-warning-hazard-alert-danger-thumbnail.png)'; // URL to your custom icon
            el.style.width = '32px';
            el.style.height = '32px';
            el.style.backgroundSize = '100%';

            new mapboxgl.Marker(el)
              .setLngLat([site.longitude, site.latitude])
              .addTo(this.map);
          }
        })
      })
    })
  }

  openScrollableModal(content: TemplateRef<any>, row) {
    this.selectedRow = row
    // this.selectedRow.dateOfIncident = this.convertDateString(this.selectedRow.dateOfIncident);
    this.form.patchValue(this.selectedRow)
    console.log(this.selectedRow)
    console.log(this.form.value)
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

}
