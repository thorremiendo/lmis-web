
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-project1-page',
  templateUrl: './project1-page.component.html',
  styleUrls: ['./project1-page.component.scss']
})
export class Project1PageComponent implements OnInit {


  constructor( private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  onScrollToSection(sectionId: string): void {
    const section = document.getElementById(`${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
