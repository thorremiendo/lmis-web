import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThresholdService {

  constructor() { }

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
}
