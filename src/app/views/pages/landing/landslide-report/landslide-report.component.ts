import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { time } from 'console';

@Component({
  selector: 'app-landslide-report',
  templateUrl: './landslide-report.component.html',
  styleUrls: ['./landslide-report.component.scss']
})
export class LandslideReportComponent implements OnInit {

  selectedDate: NgbDateStruct;
  selectedTime: string;

  remarks: string = '';

  barangays: string[] = ['barangay 1', 'barangay 2', 'barangay 3', 'barangay 4', 'barangay 5'];
  municipalities: string[] = ['munisipyu 1', 'munisipyu 2', 'munisipyu 3', 'munisipyu 4', 'munisipyu 5'];

  selectedBarangay: string = '';
  selectedMunicipality: string = '';

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

  constructor(private calendar: NgbCalendar, private fb: FormBuilder) {
    this.selectToday();
  }

  ngOnInit(): void {
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
  selectBarangay(barangay: string) {
    this.selectedBarangay = barangay;
    this.reportForm.patchValue({ barangay });
  }

  selectMunicipality(municipality: string) {
    this.selectedMunicipality = municipality;
    this.reportForm.patchValue({ municipality });
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
    console.log(this.reportForm.value);
  }
}
