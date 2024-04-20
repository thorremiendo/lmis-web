import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../services/sensors.service';

@Component({
  selector: 'app-sensor-management',
  templateUrl: './sensor-management.component.html',
  styleUrls: ['./sensor-management.component.scss']
})
export class SensorManagementComponent implements OnInit {

  constructor(private sensorService: SensorsService) { }

  ngOnInit(): void {
  }

}
