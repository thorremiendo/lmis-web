import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { 

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });

    
  }

  ngOnInit(): void {
  }

  /**
   * Close sidebar/settings when clicking the overlay on mobile
   */
  onBackdropClick(event: MouseEvent): void {
    if (!window.matchMedia('(max-width: 991px)').matches) {
      return;
    }
    if (event.target !== event.currentTarget) {
      return;
    }
    this.document.body.classList.remove('sidebar-open');
    this.document.body.classList.remove('settings-open');
  }

}
