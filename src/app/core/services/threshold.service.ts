import { Injectable } from '@angular/core';


export type RainfallThresholds = {
  RA0: [number, number];
  RA1: [number, number];
  RA2: [number, number];
  RA3: number;
};

export type SoilMoistureRanges = {
  S0: [number, number];
  S1: [number, number];
  S2: [number, number];
  S3: number;
};
@Injectable({
  providedIn: 'root'
})

export class ThresholdService {

  constructor() { }

  public getAlertLevelColor(alertLevel: string) {
    if (alertLevel === 'RA-0') {
      return '#0FB050';
    } else if (alertLevel === 'RA-1') {
      return '#FFFD01';
    } else if (alertLevel === 'RA-2') {
      return '#E1AA00';
    } else if (alertLevel === 'RA-3') {
      return '#FF0000';
    }
  }

  public determineSoilMoistureWarningRange(site: string, percent: number): string {
    const soilMoistureWarningRanges: { [site: string]: SoilMoistureRanges } = {
      '1': { S0: [0, 39], S1: [40, 59], S2: [60, 89], S3: 90 },
      '2': { S0: [0, 49], S1: [50, 69], S2: [70, 89], S3: 90 },
      '3': { S0: [0, 49], S1: [50, 69], S2: [70, 89], S3: 90 },
      '4': { S0: [0, 39], S1: [40, 59], S2: [60, 89], S3: 90 },
      '5': { S0: [0, 49], S1: [40, 79], S2: [80, 89], S3: 90 },
      '6': { S0: [0, 39], S1: [40, 69], S2: [70, 89], S3: 90 },
    };

    const siteRanges = soilMoistureWarningRanges[site];
    if (!siteRanges) {
      return 'Invalid site';
    }

    if (percent >= siteRanges.S3) {
      return 'S-3';
    } else if (percent >= siteRanges.S2[0] && percent <= siteRanges.S2[1]) {
      return 'S-2';
    } else if (percent >= siteRanges.S1[0] && percent <= siteRanges.S1[1]) {
      return 'S-1';
    } else if (percent >= siteRanges.S0[0] && percent <= siteRanges.S0[1]) {
      return 'S-0';
    } else {
      return 'Below S-0';
    }
  }

  public determineRainfallAlertLevel(observationPeriod: string, rainfallAmount: number): string {
    const thresholds: { [key: string]: RainfallThresholds } = {
      '1': { RA0: [0, 202], RA1: [203, 404], RA2: [405, 606], RA3: 607 },
      '2': { RA0: [0, 247], RA1: [248, 494], RA2: [495, 742], RA3: 743 },
      '3': { RA0: [0, 278], RA1: [279, 556], RA2: [557, 834], RA3: 835 },
      '4': { RA0: [0, 323], RA1: [324, 645], RA2: [646, 968], RA3: 969 },
    };

    const periodThresholds = thresholds[observationPeriod];
    if (!periodThresholds) {
      return 'Invalid observation period';
    }

    if (rainfallAmount >= periodThresholds.RA3) {
      return 'RA-3';
    } else if (rainfallAmount >= periodThresholds.RA2[0] && rainfallAmount <= periodThresholds.RA2[1]) {
      return 'RA-2';
    } else if (rainfallAmount >= periodThresholds.RA1[0] && rainfallAmount <= periodThresholds.RA1[1]) {
      return 'RA-1';
    } else if (rainfallAmount >= periodThresholds.RA0[0] && rainfallAmount <= periodThresholds.RA0[1]) {
      return 'RA-0';
    } else {
      return 'Below RA-0';
    }
  }

  calculateSoilMoisture(site, avgRaw) {
    if (site === 1) {
      const numerator = (1.003978 * avgRaw) - 1799.78
      const denominator = 8.103809 + (0.002828 * avgRaw)
      return numerator / denominator
    }
    else if (site === 2) {
      const numerator = (1.000175 * avgRaw) - 1692.96
      const denominator = 8.313092 + (0.003017 * avgRaw)
      return numerator / denominator
    }
    else if (site === 3) {
      const numerator = (0.998274 * avgRaw) - 1789.55
      const denominator = 8.328518 + (0.003046 * avgRaw)
      return numerator / denominator
    }
    else if (site === 4) {
      const numerator = (1.002077 * avgRaw) - 1796.37
      const denominator = 7.626605 + (0.002524 * avgRaw)
      return numerator / denominator
    }
    else if (site === 5) {
      const numerator = (1.004929 * avgRaw) - 1801.48
      const denominator = 7.367469 + (0.002354 * avgRaw)
      return numerator / denominator
    }
    else if (site === 6) {
      const numerator = (1.003978 * avgRaw) - 1799.78
      const denominator = 8.190489 + (0.002891 * avgRaw)
      return numerator / denominator
    }
  }

  public getAlertDescription(e) {
    if (e === 'LA-0') {
      return 'Normal Site Conditions that cannot Trigger a Landslide'
    } else if (e === 'LA-1') {
      return 'Significant Site Conditions to Trigger a Landslide'
    } else if (e === 'LA-2') {
      return 'Alarming Site Conditions to Trigger a Landslide'
    }
    else if (e === 'LA-3') {
      return 'Critical Site Conditions to Trigger a Landslide'
    }
  }

  public getLandslideAlertLevel(rainfallAlertLevel: string, soilMoistureAlertLevel: string): string {
    // Define a mapping of scenarios to landslide alert levels
    const alertLevelMapping = {
      'RA-0_S-0': 'LA-0',
      'RA-0_S-1': 'LA-1',
      'RA-0_S-2': 'LA-2',
      'RA-0_S-3': 'LA-1',
      'RA-1_S-0': 'LA-1',
      'RA-1_S-1': 'LA-2',
      'RA-1_S-2': 'LA-2',
      'RA-1_S-3': 'LA-2',
      'RA-2_S-0': 'LA-2',
      'RA-2_S-1': 'LA-2',
      'RA-2_S-2': 'LA-3',
      'RA-2_S-3': 'LA-3',
      'RA-3_S-0': 'LA-1',
      'RA-3_S-1': 'LA-2',
      'RA-3_S-2': 'LA-3',
      'RA-3_S-3': 'LA-3',
    };

    // Construct the key from the input parameters
    const key = `${rainfallAlertLevel}_${soilMoistureAlertLevel}`;

    // Return the corresponding landslide alert level, or a default value if not found
    return alertLevelMapping[key] || 'Unknown';
  }
}
