
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() scrollToSection: EventEmitter<string> = new EventEmitter<string>();


  constructor(private router: Router, private viewportScroller: ViewportScroller) { }



  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(this.router.url);
        if (urlTree.fragment) {
          this.viewportScroller.scrollToAnchor(urlTree.fragment);
        }
      }
    });
  }

  onClickScrollTo(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
    setTimeout(() => {
      const stickyNavHeight = 100;
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top;
        window.scrollBy(0, offsetTop - stickyNavHeight);
      }
    }, 0);
  }
}
