import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { time } from 'console';
import { DataService } from 'src/app/core/services/data.service';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-landslide-report',
  templateUrl: './landslide-report.component.html',
  styleUrls: ['./landslide-report.component.scss']
})
export class LandslideReportComponent implements OnInit {
  public isLoading: boolean = false
  selectedDate: NgbDateStruct;
  selectedTime: string;

  remarks: string = '';

  barangays = []
  municipalities = []

  selectedBarangay
  selectedMunicipality

  reportForm: FormGroup



  public config: DropzoneConfigInterface = {
    url: 'localhost:3000',
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private dataService: DataService, private swalService: SwalService) {
    this.selectToday();
  }

  ngOnInit(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
    })

    this.reportForm = this.fb.group({
      date: new FormControl(""),
      time: new FormControl(""),
      remarks: new FormControl(""),
      barangay: new FormControl(""),
      municipality: new FormControl("")
    })
  }

  //date & time
  selectToday() {
    this.selectedDate = this.calendar.getToday();
    const now = new Date();
    this.selectedTime = now.toTimeString().slice(0, 5);
  }

  //location
  selectBarangay(barangay) {
    this.selectedBarangay = barangay;
    this.reportForm.patchValue({ barangay: barangay.id });
  }

  selectMunicipality(municipality) {
    this.selectedMunicipality = municipality;
    this.reportForm.patchValue({ municipality: municipality.id });
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res
    })
  }


  //file upload
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  //form data
  submitForm() {
    this.isLoading = true
    const { date, time, municipality, barangay, remarks } = this.reportForm.controls
    const body = {
      "dateOfIncident": this.convertToISODate(date.value),
      "timeOfIncident": time.value,
      "municipalityId": municipality.value,
      "barangayId": barangay.value,
      "remarks": remarks.value,
    }

    this.dataService.submitReport(body).subscribe(res => {
      this.swalService.showSuccess()
      this.isLoading = false
    })
  }

  convertToISODate(dateObj: { year: number, month: number, day: number }): string {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return date.toISOString();
  }
}


