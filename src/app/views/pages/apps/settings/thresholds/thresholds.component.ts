import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataService } from 'src/app/core/services/data.service';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-thresholds',
  templateUrl: './thresholds.component.html',
  styleUrls: ['./thresholds.component.scss']
})
export class ThresholdsComponent implements OnInit {
  public rainfallThresholdsData = []
  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  public form: FormGroup
  public selectedRow

  constructor(private dataService: DataService, private modalService: NgbModal, private fb: FormBuilder, private swal: SwalService) {
    this.form = this.fb.group({
      ra0Min: [''],
      ra0Max: [''],
      ra1Min: [''],
      ra1Max: [''],
      ra2Min: [''],
      ra2Max: [''],
      ra3Min: [''],
      ra3Max: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.getRainfallThresholds().subscribe((data: any) => {
      this.rainfallThresholdsData = data
    }
    )
  }

  getPeriod(value) {
    if (value === 1) {
      return '1hr - 24hrs'
    } else if (value === 2) {
      return '1hr - 48hrs'
    } else if (value === 3) {
      return '1hr - 72hrs'
    } else if (value === 4) {
      return '1hr - 120hrs'
    }
  }

  openScrollableModal(content: TemplateRef<any>, row) {
    this.selectedRow = row
    this.form.patchValue(this.selectedRow)
    console.log(this.selectedRow.id)
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  onSaveEdit() {
    console.log(this.form.value)
    console.log(this.selectedRow)
    this.dataService.updateRainfallThreshold(this.selectedRow.id, this.form.value).subscribe((data: any) => {
      this.swal.showSuccess()
      this.modalService.dismissAll()
      this.ngOnInit()
    })
  }

  handleReset() {
    this.dataService.resetRainfallThresholds().subscribe((data: any) => {
      this.swal.showSuccess()
      this.ngOnInit()
    })
  }

}
