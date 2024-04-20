import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    get(url: string, params: HttpParams): Observable<any> {
        const completeUrl = this.generateUrl(url);

        return this.httpClient.get(completeUrl, {
            params,
        });
    }

    post(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        const completeUrl = this.generateUrl(url);

        // const formData = this.createFormData(body);

        return this.httpClient.post(completeUrl, body, { headers: headers });
    }

    postFormData(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        const completeUrl = this.generateUrl(url);
        const formData = this.createFormData(body);
        return this.httpClient.post(completeUrl, formData);
    }

    postFormFileData(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        // const completeUrl = this.generateUrl(url);
        const formData = this.createFormData(body);
        return this.httpClient.post(url, formData);
    }

    put(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        const completeUrl = this.generateUrl(url);

        // const formData = this.createFormData(body);

        return this.httpClient.put(completeUrl, body, { headers: headers });
    }

    patch(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        const completeUrl = this.generateUrl(url);

        // const formData = this.createFormData(body);

        return this.httpClient.patch(completeUrl, body, { headers: headers });
    }



    // delete(url: any, body: string): Observable<any> {
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   });

    //   const completeUrl = this.generateUrl(url);
    //   // const formData = this.createFormData(body);
    //   return this.httpClient.delete(completeUrl, body);
    // }

    putFormData(url: any, body: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        const completeUrl = this.generateUrl(url);
        const formData = this.createFormData(body);
        return this.httpClient.put(completeUrl, formData);
    }

    generateUrl(url: string): string {
        const apiUrl = environment.apiUrl;

        return `${apiUrl}${url}`;
    }


    createFormData(
        object: any,
        form?: FormData,
        namespace?: string
    ): FormData {
        const formData = form || new FormData();

        for (let property in object) {
            if (
                !object.hasOwnProperty(property) &&
                object[property] == null &&
                object[property] === undefined
            ) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (
                typeof object[property] === 'object' &&
                !(object[property] instanceof File) &&
                !(object[property] instanceof Blob)
            ) {
                this.createFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }
}
