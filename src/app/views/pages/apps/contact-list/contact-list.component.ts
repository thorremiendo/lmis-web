import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('lmisUser'));
  public reportsData = [
    {
      barangay: "Gibraltar",
      name: "Juan Dela Cruz",
      contact: "09123456789",
    },
    {
      barangay: "Mines View",
      name: "John Santos",
      contact: "09123456789",
    }, {
      barangay: "Pacdal",
      name: "Eric Manalo",
      contact: "09123456789",
    }, {
      barangay: "Gibraltar",
      name: "Kim Pineda",
      contact: "09123456789",
    }]

  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  barangays = []
  municipalities = []
  selectedBarangay
  selectedMunicipality
  @ViewChild('fileInput') fileInput;

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.fileInput.nativeElement.addEventListener('change', (event) => {
      const file = event.target.files[0];
      console.log(file);
    });
  }
  ngOnInit(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
    })
  }

  selectBarangay(barangay) {
    this.selectedBarangay = barangay;
  }

  selectMunicipality(municipality) {
    this.selectedMunicipality = municipality;
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res
    })
  }

}
