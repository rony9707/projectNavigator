import { Component, Input, OnInit } from '@angular/core';
import { DownloadLink } from '../home.interface';

@Component({
  selector: 'app-download-links',
  templateUrl: './download-links.component.html',
  styleUrls: ['./download-links.component.css']
})
export class DownloadLinksComponent implements OnInit {

  @Input() DownloadLink: DownloadLink[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
