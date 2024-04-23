import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
