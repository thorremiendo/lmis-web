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


  getVerifiedReports() {
    const url = `/reports/status/verified`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getRainfallThresholds() {
    const url = `/rainfall-thresholds`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getRainfallThresholdsByPeriod(id: number) {
    const url = `/rainfall-thresholds/${id}`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateRainfallThreshold(id: number, body) {
    const url = `/rainfall-thresholds/${id}`

    return this.apiService.put(url, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  resetRainfallThresholds() {
    const url = `/rainfall-thresholds/reset`

    return this.apiService.post(url, "");
  }

  createContact(body) {
    const url = "/contacts";
    return this.apiService.post(url, body);
  }

  getContacts() {
    const url = `/contacts`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  createNotification(body) {
    const url = "/notification";
    return this.apiService.post(url, body);
  }

  getNotificationsByUserId(userId: number) {
    const url = `/notification/user/${userId}`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAlertWarningById() {
    const url = `/alertwarning/1`

    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


  updateAlertWarning(body) {
    const url = `/alertwarning/1`

    return this.apiService.put(url, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
