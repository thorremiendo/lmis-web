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
  sites = [{ lng: 120.5669193, lat: 16.3778389 }, { lng: 120.573431, lat: 16.4481207 }, { lng: 120.5731177, lat: 16.44873 }]

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
        .setLngLat([site.lng, site.lat])
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
          this.directions.setOrigin([120.5585654, 16.3773406])
          // this.directions.setOrigin([120.5585654, 16.3773406])
          this.directions.setDestination([120.5669193, 16.3778389])
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
          this.directions.setDestination([120.5669193, 16.3778389])
        }, 1500);
        break;
      case 2:
        setTimeout(() => {
          this.directions.setDestination([120.573431, 16.4481207])
        }, 1500);
        break;
      case 3:
        setTimeout(() => {
          this.directions.setDestination([120.6306466, 16.3463546])
        }, 1500);
        break;
      case 4:
        setTimeout(() => {
          this.directions.setDestination([120.5133252, 16.478773])
        }, 1500);
        break;
      case 5:
        setTimeout(() => {
          this.directions.setDestination([120.5877935, 16.2892371])
        }, 1500);
        break;
      case 6:
        setTimeout(() => {
          this.directions.setDestination([120.651141, 16.4974758])
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
