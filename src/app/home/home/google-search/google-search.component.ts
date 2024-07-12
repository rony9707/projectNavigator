import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-google-search',
  templateUrl: './google-search.component.html',
  styleUrls: ['./google-search.component.css']
})
export class GoogleSearchComponent implements OnInit {

  @ViewChild('placeholder') placeholder!: ElementRef;
  @ViewChild('googlesearch') googlesearch!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  

  inputFocus(){
    this.placeholder.nativeElement.style.transform = 'translateY(-45px)';
    this.placeholder.nativeElement.style.transition = 'transform 0.3s ease-in-out';
  }

  inputBlur(){
    if(this.googlesearch.nativeElement.value=='')
    {
      this.placeholder.nativeElement.style.transform = 'translateY(0)';
      this.placeholder.nativeElement.style.transition = 'transform 0.3s ease-in-out';
    }
  }

  onSearch(query: string) {
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  }

  onEnter(query: string) {
    this.onSearch(query);
  }

}
