import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: ApiService) { }

  getMunicipalities() {
    const url = "/municipalities"

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getBarangays(id: number) {
    const url = `/barangays/${id}`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  submitReport(body) {
    const url = "/reports";
    return this.apiService.post(url, body);
  }

  getReports() {
    const url = "/reports"

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getReportsById(id: number) {
    const url = `/reports/${id}`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


  updateReport(id: number, body) {
    const url = `/reports/${id}`

    return this.apiService.put(url, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


}
