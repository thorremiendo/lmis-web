import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 16.3773406;
  lng: number = 120.5585654;
  directions
  sites = [
    {
      id: 1,
      municipality: "Baguio City",
      coords: { lng: 120.5659538, lat: 16.3772419 }
    },
    {
      id: 2,
      municipality: "La Trinidad",
      coords: { lng: 120.573431, lat: 16.4481207 },
    },
    {
      id: 3,
      municipality: "La Trinidad",
      coords: { lng: 120.5731177, lat: 16.44873 },
    },
    {
      id: 4,
      municipality: "Itogon",
      coords: { lng: 120.6306466, lat: 16.3463546 },
    },
    {
      id: 5,
      municipality: "Itogon",
      coords: { lng: 120.652561, lat: 16.3254651 },
    },
    {
      id: 6,
      municipality: "Sablan",
      coords: { lng: 120.5133252, lat: 16.478773 },
    },
    {
      id: 7,
      municipality: "Sablan",
      coords: { lng: 120.5138543, lat: 16.4786505 },
    },
    {
      id: 8,
      municipality: "Tuba",
      coords: { lng: 120.5877935, lat: 16.2892371 },
    },
    {
      id: 9,
      municipality: "Tuba",
      coords: { lng: 120.5900898, lat: 16.2895354 },
    },
    {
      id: 10,
      municipality: "Tublay",
      coords: { lng: 120.651141, lat: 16.4974758 },
    },
    {
      id: 11,
      municipality: "Tublay",
      coords: { lng: 120.6508378, lat: 16.4972556 },
    },
  ]

  constructor() { }

  ngOnInit(): void {
    const control = new mapboxgl.NavigationControl({
      visualizePitch: true
    })

    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
      attributionControl: false,
      projection: {
        name: 'globe'
      }
    });

    let geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })

    this.directions = new MapboxDirections({
      accessToken: environment.mapboxToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      container: 'directions',
      bearing: true,
      voice_instructions: true,
      controls: {
        inputs: true,
        instructions: true,
        profileSwitcher: true
      }
    })

    this.sites.forEach((site) => {
      new mapboxgl.Marker()
        .setLngLat([site.coords.lng, site.coords.lat])
        .addTo(this.map);
    })

    this.map.addControl(this.directions, 'top-left')
    this.map.addControl(control, 'top-right')
    this.map.addControl(geoLocate, 'top-right')
    // geoLocate.on('geolocate', locateUser)
    // this.map.on('load', () => {
    //   geoLocate.trigger()
    // })
    this.map.on('load', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.directions.setOrigin([position.coords.longitude, position.coords.latitude])
          // this.directions.setOrigin([120.5585654, 16.3773406])
        })
      }
    })
    this.map.addControl(new mapboxgl.ScaleControl(), 'bottom-right')
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right')
  }

  public selectSite(site: number) {
    switch (site) {
      case 1:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 1)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 2:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 2)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 3:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 3)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 4:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 4)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 5:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 5)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 6:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 6)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 7:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 7)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 8:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 8)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 9:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 9)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 10:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 10)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;
      case 11:
        setTimeout(() => {
          const site = this.sites.find(e => e.id === 11)
          this.directions.setDestination([site.coords.lng, site.coords.lat])
        }, 1500);
        break;


      default:
        break;
    }
  }

}

function locateUser(e: any) {
  console.log(e)
}
