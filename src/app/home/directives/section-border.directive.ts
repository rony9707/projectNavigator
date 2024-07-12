import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSectionBorder]'
})
export class SectionBorderDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#FFECD6');
    this.renderer.setStyle(this.element.nativeElement, 'borderRadius', '5px');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'black');
    this.renderer.setStyle(this.element.nativeElement, 'boxShadow', '0 0 10px rgb(0, 0, 0)');
  }

}
