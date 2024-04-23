
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() scrollToSection: EventEmitter<string> = new EventEmitter<string>();


  isScrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Logic to determine if the page is scrolled
    if (window.scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

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

  navigateToHome() {
    this.router.navigate(['./home'])
  }

  navigateToProject2Page() {
    this.router.navigate(['./home/project2']);
  }
  
  navigateToProject1Page() {
    this.router.navigate(['./home/project1']);
  }
}