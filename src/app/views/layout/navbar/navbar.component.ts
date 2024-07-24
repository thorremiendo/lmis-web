import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, TemplateRef } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/core/services/swal.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public recommendations = ["Pre-emptive Evacuation", "Forced Evacuation", "Status Quo"]
  public user
  public notifications

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private modalService: NgbModal,
    private swal: SwalService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('lmisUser'))
    this.dataService.getNotificationsByUserId(this.user.id).subscribe(res => {
      this.notifications = res
    })
  }

  submit() {
    this.swal.showFullSuccess("Evacuation Notifications sent on Mobile App and SMS!")
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  openScrollableModal(content: TemplateRef<any>,) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }
}
