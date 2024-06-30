import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { SensorParams } from '../models/sensor-params';
import { catchError, map, throwError } from 'rxjs';
import { SensorDataType } from '../models/sensor-data-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private api: ApiService) { }

  getSensorData(sensorParams: SensorParams) {

    let params = new HttpParams();
    for (const key in sensorParams) {
      if (sensorParams.hasOwnProperty(key)) {
        params = params.set(key, sensorParams[key as keyof SensorParams]);
      }
    }

    return this.api.get("/sensors/readings", params).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
