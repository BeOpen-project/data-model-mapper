import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent implements OnInit, AfterViewInit {

  private panels: HTMLElement[] = [];
  private currentIndex = 0;
  private isScrolling = false;

  constructor(
    private router: Router,
    private elRef: ElementRef
  ) { }
  ngAfterViewInit(): void {
    this.panels = Array.from(this.elRef.nativeElement.querySelectorAll('.panel'));
    this.scrollToPanel(this.currentIndex);
  }


  ngOnInit(): void {
  }

  toHome() {
    this.router.navigate(['/pages/dmm-editor']);
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.isScrolling) return;

    if (event.deltaY > 0 && this.currentIndex < this.panels.length - 1) {
      this.currentIndex++;
    } else if (event.deltaY < 0 && this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      return;
    }

    this.isScrolling = true;
    this.scrollToPanel(this.currentIndex);
    setTimeout(() => this.isScrolling = false, 500); // debounce
  }

  private scrollToPanel(index: number): void {
    this.panels[index]?.scrollIntoView({ behavior: 'smooth' });
  }

}
