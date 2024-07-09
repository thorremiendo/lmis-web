import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SensorSites } from 'src/app/views/pages/apps/models/sensor-site-type.enum';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    public obj = {
        primary: "#6571ff",
        secondary: "#7987a1",
        success: "#05a34a",
        info: "#66d1d1",
        warning: "#fbbc06",
        danger: "#ff3366",
        light: "#e9ecef",
        dark: "#060c17",
        muted: "#7987a1",
        gridBorder: "rgba(77, 138, 240, .15)",
        bodyColor: "#000",
        cardBg: "#fff",
        fontFamily: "'Roboto', Helvetica, sans-serif"
    }

    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: true,
                    color: this.obj.gridBorder,
                    borderColor: this.obj.gridBorder,
                },
                ticks: {
                    color: this.obj.bodyColor,
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    display: true,
                    color: this.obj.gridBorder,
                    borderColor: this.obj.gridBorder,
                },
                ticks: {
                    color: this.obj.bodyColor,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [];
    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [
            {
                label: "Rainfall Amount",
                backgroundColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                hoverBackgroundColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                borderColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                hoverBorderColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                data: [],
            }
        ],
    };
    public soilMoistureBarChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [
            {
                label: "Soil Moisture",
                backgroundColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                hoverBackgroundColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                borderColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                hoverBorderColor: [this.obj.primary, this.obj.danger, this.obj.warning, this.obj.success, this.obj.info, this.obj.muted],
                data: [],
            }
        ],
    };
    public lineChartData: ChartConfiguration['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: "",
            borderColor: this.obj.info,
            backgroundColor: "transparent",
            fill: true,
            pointBackgroundColor: this.obj.cardBg,
            pointHoverBackgroundColor: this.obj.cardBg,
            pointBorderColor: this.obj.info,
            pointHoverBorderColor: this.obj.info,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 3,
            tension: .3
        }
        ]
    };
    public soilMoistureChartData: ChartConfiguration['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: "",
            borderColor: this.obj.info,
            backgroundColor: "transparent",
            fill: true,
            pointBackgroundColor: this.obj.cardBg,
            pointHoverBackgroundColor: this.obj.cardBg,
            pointBorderColor: this.obj.info,
            pointHoverBorderColor: this.obj.info,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 3,
            tension: .3
        }
        ]
    };
    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: this.obj.bodyColor,
                    font: {
                        size: 13,
                        family: this.obj.fontFamily
                    }
                }
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: true,
                    color: this.obj.gridBorder,
                    borderColor: this.obj.gridBorder,
                },
                ticks: {
                    color: this.obj.bodyColor,
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    display: true,
                    color: this.obj.gridBorder,
                    borderColor: this.obj.gridBorder,
                },
                ticks: {
                    color: this.obj.bodyColor,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };
    public lineChartType: ChartType = 'line';
    public lineChartPlugins = [];


    public getKeyByValue(value: string): string | undefined {
        const entries = Object.entries(SensorSites);
        for (const [key, val] of entries) {
            if (val === value) {
                return key;
            }
        }
        return undefined; // Return undefined if the value is not found
    }
}
