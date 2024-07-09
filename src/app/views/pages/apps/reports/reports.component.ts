import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('lmisUser'));
  public reportsData = []
  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  public selectedRow
  public form: FormGroup
  public landslideCategories = [
    {
      name: "Rockfall",
      value: "RockFall"
    },
    {
      name: "Block Slide",
      value: "BlockSlide"
    },
    {
      name: "Debris Flow",
      value: "DebrisFlow"
    },
    {
      name: "Debris Avalanche",
      value: "DebrisAvalanche"
    },
    {
      name: "Creep",
      value: "Creep"
    },
    {
      name: "Rotational",
      value: "Rotational"
    },
    {
      name: "Translational",
      value: "Translational"
    },
    {
      name: "Topple",
      value: "Topple"
    },
    {
      name: "Earth Flow",
      value: "EarthFlow"
    },
    {
      name: "Lateral Spread",
      value: "LateralSpread"
    },

  ]

  public susceptibility = ["High", "Medium", "Low"]

  public status = [
    {
      name: "Unverified",
      value: 0
    },
    {
      name: "Verified",
      value: 1
    },
  ]

  constructor(private dataService: DataService, private modalService: NgbModal, private fb: FormBuilder, private swalService: SwalService) {
    this.form = this.fb.group({
      dateOfIncident: [''],
      timeOfIncident: [''],
      dateReported: [''],
      municipalityId: [null],
      barangayId: [null],
      latitude: [null],
      longitude: [null],
      approvedBy: [null],
      roadNetworks: [null],
      builtUpAreas: [null],
      displaced: [null],
      injured: [null],
      dead: [null],
      landslideCategory: [null],
      triggeringMechanism: [null],
      remarks: [''],
      landslideSusceptibility: [null],
      floodingSusceptibility: [null],
      photo: [null],
      actionsTaken: [null],
    });
  }

  ngOnInit(): void {
    this.getReports()
  }
  getReports() {
    this.dataService.getReports().subscribe((data: any) => {
      this.reportsData = data.data.map((report: any) => {
        report.dateOfIncident = this.convertISOTOLocalDate(report.dateOfIncident);
        report.dateReported = this.convertISOTOLocalDate(report.dateReported);
        report.municipalityName = report.Municipality.name;
        report.barangayName = report.Barangay.name;
        report.source = "No data";
        return report;
      });
    })
  }

  convertISOTOLocalDate(isoDate: string): string {
    const date = new Date(isoDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based so we add 1
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  openScrollableModal(content: TemplateRef<any>, row) {
    this.selectedRow = row
    // this.selectedRow.dateOfIncident = this.convertDateString(this.selectedRow.dateOfIncident);
    this.form.patchValue(this.selectedRow)
    console.log(this.selectedRow.id)
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  convertDateString(dateString: string): { year: number, month: number, day: number } {
    let [month, day, year] = dateString.split('-').map(Number);
    return { year, month, day };
  }


  convertToIsoDate(dateString: string): string {
    let [month, day, year] = dateString.split('-').map(Number);
    let date = new Date(year, month - 1, day); // months are 0-indexed in JavaScript
    return date.toISOString();
  }

  onSaveEdit() {
    this.form.patchValue({
      dateOfIncident: this.convertToIsoDate(this.form.value.dateOfIncident),
    })
    this.form.removeControl('dateReported')
    this.dataService.updateReport(this.selectedRow.id, this.form.value).subscribe((data: any) => {
      console.log(data)
      this.swalService.showSuccessMessage("Updated successfully!")
      this.modalService.dismissAll()
      this.getReports()
    })
  }

  onSelect(e, row) {
    const body = {
      status: parseInt(e),
      verifiedBy: this.user.firstName
    }
    console.log(body)

    this.dataService.updateReport(row.id, body).subscribe(res => {
      this.swalService.showSuccess()
      this.getReports()
    })
  }
}
