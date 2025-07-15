import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent {
  public currentYear = new Date().getFullYear();

  @Output() navigateToHome = new EventEmitter<void>();
  @Output() navigateToProject1 = new EventEmitter<void>();
  @Output() navigateToProject2 = new EventEmitter<void>();
  @Output() scrollToSection = new EventEmitter<string>();

  onNavigateHome() {
    this.navigateToHome.emit();
  }
  onNavigateProject1() {
    this.navigateToProject1.emit();
  }
  onNavigateProject2() {
    this.navigateToProject2.emit();
  }
  onScrollTo(section: string) {
    this.scrollToSection.emit(section);
  }
}
