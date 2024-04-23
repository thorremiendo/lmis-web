import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project2-page',
  templateUrl: './project2-page.component.html',
  styleUrls: ['./project2-page.component.scss']
})
export class Project2PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  onScrollToSection(sectionId: string): void {
    const section = document.getElementById(`${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
