import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSectionBorder]'
})
export class SectionBorderDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this.element.nativeElement, 'background', 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))');
    this.renderer.setStyle(this.element.nativeElement, 'backdropFilter', 'blur(10px)');
    this.renderer.setStyle(this.element.nativeElement, '-webkit-backdrop-filter', 'blur(10px)');
    this.renderer.setStyle(this.element.nativeElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.element.nativeElement, 'border', '5px solid rgba(255, 255, 255, 0.18)');
    this.renderer.setStyle(this.element.nativeElement, 'boxShadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)');
  }

}
