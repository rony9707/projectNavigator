import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent implements OnInit ,AfterViewInit{

  constructor(private renderer: Renderer2) { }

  @Input() sectionTitle:string | undefined
  @Input() left:number | undefined

  @ViewChild('titleDiv') titleDiv!: ElementRef;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.left !== undefined) {
      this.renderer.setStyle(this.titleDiv.nativeElement, 'left', `${this.left}px`);
    }
  }

}
