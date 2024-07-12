import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApplicationLink } from '../home.interface';

@Component({
  selector: 'app-env-links',
  templateUrl: './env-links.component.html',
  styleUrls: ['./env-links.component.css']
})
export class EnvLinksComponent implements OnInit, OnChanges {

  @Input() applicationLinks: ApplicationLink[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log("env link ",this.applicationLinks)
  }

}
