import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rapid-risk-assessment',
  templateUrl: './rapid-risk-assessment.component.html',
  styleUrls: ['./rapid-risk-assessment.component.scss']
})
export class RapidRiskAssessmentComponent implements OnInit {
  slope: number
  vFactorValue: any
  fFactorValue: any
  sRatingValue: any
  sRedValue: any
  dRedValue: any
  aRatingValue: any
  lFactorValue: any
  calculatedFs: any
  assessment: any

  vFactor = [
    {
      name: 'No Vegetation',
      value: 1.0
    },
    {
      name: 'Predominantly grass or vegetation with shallow roots',
      value: 1.1
    },
    {
      name: 'Coconut, bamboo or vegetation with moderately deep roots',
      value: 1.3
    },
    {
      name: 'Dense forests with trees of the same specie having age less than or equal to 20 years',
      value: 1.5
    },
    {
      name: 'Dense and mixed forests with trees having age less than or equal to 20 years',
      value: 2.0
    },
    {
      name: 'Dense forests with pine trees having ages of more than 20 years',
      value: 2.0
    },
    {
      name: 'Dense and mixed forests with trees having ages of more than 20 years',
      value: 2.5
    },
  ]

  fFactor = [
    {
      name: 'Once a year or more than once a year',
      value: 0.5
    },
    {
      name: 'Presence of past failure, but occurrence not yearly',
      value: 0.7
    },
    {
      name: 'Presence of tensile cracks in ground',
      value: 0.7
    },
    {
      name: 'If with retaining wall, wall is deformed',
      value: 0.7
    },
    {
      name: 'None',
      value: 1.2
    },
  ]

  soilSRating = [
    {
      name: 'HS1: Stiff, dense gravelly, sandy, silty and clayey soils (with significant amount of cementation)',
      value: 25
    },
    {
      name: 'SS1: Gravelly soils',
      value: 10
    },
    {
      name: 'SS2: Sandy soils',
      value: 8
    },
    {
      name: 'SS3: Silty/clayey soils',
      value: 5
    },
  ]

  rockSRating = [
    {
      name: 'HR1: Massive & intact hard rock, s > 2m',
      value: 100
    },
    {
      name: 'HR2: Blocky, well-interlocked hard rock, 0.6m<s< 2m',
      value: 45
    },
    {
      name: 'HR3: Highly fractured hard rock, 0.1m < s < 0.6m',
      value: 25
    },
    {
      name: 'HR4: Disintegrated, protruding rocks and boulders (may include soft rock fragments)',
      value: 13
    },
    {
      name: 'SR1: Massive & intact soft rock',
      value: 30
    },
    {
      name: 'SR2: Fractured soft rock',
      value: 15
    },
  ]

  sRed = [
    {
      name: 'Yearlong',
      value: 2
    },
    {
      name: 'Only during rainy season',
      value: 1
    },
    {
      name: 'No flow/spring',
      value: 0
    },
  ]

  dRed = [
    {
      name: 'No drainage canals',
      value: 2
    },
    {
      name: 'Totally clogged, filled with debris',
      value: 2
    },
    {
      name: 'Partially clogged or overflows during heavy rains',
      value: 1
    },
    {
      name: 'Water leaks into the slope',
      value: 1
    },
    {
      name: 'Good working condition',
      value: 0
    },
  ]

  slopeRating = [
    {
      name: 'α ≥ 75° (or with overhang)',
      value: 100
    },
    {
      name: '60° ≤ α < 75°',
      value: 32
    },
    {
      name: '45° ≤ α < 60°',
      value: 17
    },
    {
      name: '30° ≤ α < 45°',
      value: 10
    },
    {
      name: '15 ≤  α < 30° ',
      value: 5
    },
    {
      name: 'α ≤ 15° ',
      value: 2
    },
  ]


  landUse = [
    {
      name: "Dense residential area (with closely spaced structures <5m)",
      value: 1.4
    },
    {
      name: "Commercial with building/s having 2 storeys or more ",
      value: 1.4
    },
    {
      name: "Residential area with buildings having 2 storeys spaced at ≥5m",
      value: 1.25
    },
    {
      name: "Road/highway with heavy traffic (1 truck or more every 10mins)",
      value: 1.4
    },
    {
      name: "Road/highway with light traffic (less than 1 truck every 10mins)  ",
      value: 1.25
    },
    {
      name: "Agricultural area, grasslands and bushlands",
      value: 1
    },
    {
      name: "Forest",
      value: 1
    },
    {
      name: "Uninhabited and no vegetation",
      value: 1
    },
  ]

  slopeMaterial = [
    {
      name: "Rocks",
      value: 1
    },
    {
      name: "Soil",
      value: 2
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onVfactor(e) {
    this.vFactorValue = e
  }

  onFfactor(e) {
    this.fFactorValue = e
  }

  onSRating(e) {
    this.sRatingValue = e
  }

  onSRed(e) {
    this.sRedValue = e
  }

  onDRed(e) {
    this.dRedValue = e
  }

  onARating(e) {
    this.aRatingValue = e
  }

  onLFactor(e) {
    this.lFactorValue = e
  }

  onSlope(e) {
    this.sRatingValue = null
    this.slope = e
  }

  onCalculate() {
    const numerator = this.vFactorValue * this.fFactorValue * (this.sRatingValue - this.sRedValue - this.dRedValue);
    const denominator = this.aRatingValue * this.lFactorValue;
    this.calculatedFs = numerator / denominator;
    if (this.calculatedFs > 1.2) {
      this.assessment = "Stable";
    } else if (1.0 <= this.calculatedFs && this.calculatedFs < 1.2) {
      this.assessment = "Marginally Stable";
    } else if (0.7 <= this.calculatedFs && this.calculatedFs < 1.0) {
      this.assessment = "Susceptible";
    } else if (this.calculatedFs < 0.7) {
      this.assessment = "Highly Susceptible";
    }
    console.log(this.assessment, this.calculatedFs)
  }

  onReset() {
    this.slope = null
    this.vFactorValue = null
    this.fFactorValue = null
    this.sRatingValue = null
    this.sRedValue = null
    this.dRedValue = null
    this.aRatingValue = null
    this.lFactorValue = null
    this.calculatedFs = null
    this.assessment = null
  }

}
