import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataService } from 'src/app/core/services/data.service';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('lmisUser'));
  public contactsData = []
  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  public form: FormGroup

  barangays = []
  municipalities = []
  selectedBarangay
  selectedMunicipality
  @ViewChild('fileInput') fileInput;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private swal: SwalService
  ) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      contactNumber: [''],
      municipalityId: [''],
      barangayId: [''],
    })
  }

  ngAfterViewInit() {
    this.fileInput.nativeElement.addEventListener('change', (event) => {
      const file = event.target.files[0];
      console.log(file);
    });
  }

  ngOnInit(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
      this.fetchData()
    })
  }

  onMunicipalityChange(event) {
    this.dataService.getBarangays(parseInt(this.form.controls.municipalityId.value)).subscribe(res => {
      this.barangays = res
    })
  }

  openScrollableModal(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  onSave() {
    this.form.patchValue({
      municipalityId: parseInt(this.form.controls.municipalityId.value),
      barangayId: parseInt(this.form.controls.barangayId.value),
    })
    this.dataService.createContact(this.form.value).subscribe(res => {
      this.swal.showSuccess()
      setTimeout(() => {
        this.modalService.dismissAll()
        this.fetchData()
      }, 1000);
    })
  }

  fetchData() {
    this.dataService.getContacts().subscribe(res => {
      this.contactsData = res
      this.contactsData.forEach(contact => {
        contact.municipality = contact.Municipality.name
        contact.barangay = contact.Barangay.name
      })
    })
  }

  handleSms(row) {
    console.log(row)
    const body = {
      "contactNumber": row.contactNumber,
      "body": "This is a test message from LMIS",
      "sender": "LMIS"
    }

    this.dataService.createNotification(body).subscribe(res => {
      this.swal.showSuccessMessage("Message sent successfully")
    })
  }

}
