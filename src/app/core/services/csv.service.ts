import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CsvService {


    exportToCSV(data): void {
        const csvData = this.convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'sensordata.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    convertToCSV(data: any[]): string {
        const headers = ['Device Name', 'Reading Type', 'Date Time', 'Value'];
        const rows = data.map(item => {
            return [
                item.metadata.device_name,
                item.metadata.readingType,
                item.datetime,
                item.value
            ].join(',');
        });
        return [headers.join(','), ...rows].join('\n');
    }


}
