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

  getSensorDataByDataType(dataType: number) {
    const dataTypeString = SensorDataType[dataType];

    const sensorParams: SensorParams = {
      device_sn: 'z6-24345',
      start_date: '2024-01-01 00:00',
      end_date: '2024-03-31 23:59',
      output_format: 'json',
      page_num: 2,
      per_page: 2,
      device_depth: true,
      sort_by: 'descending'
    };

    let params = new HttpParams();
    for (const key in sensorParams) {
      if (sensorParams.hasOwnProperty(key)) {
        params = params.set(key, sensorParams[key as keyof SensorParams]);
      }
    }

    return this.api.get("/sensors", params).pipe(
      map((data: any) => {
        return data.data[dataTypeString];
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getSensorData(sensorParams: SensorParams) {

    let params = new HttpParams();
    for (const key in sensorParams) {
      if (sensorParams.hasOwnProperty(key)) {
        params = params.set(key, sensorParams[key as keyof SensorParams]);
      }
    }

    return this.api.get("/sensors", params).pipe(
      map((data: any) => {
        return data.data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
