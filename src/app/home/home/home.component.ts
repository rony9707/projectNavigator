import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JsonServiceService } from 'src/app/services/json-service.service';
import { ApplicationLink, ProjectTitle } from './home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jsonData: any;
  private subscription: Subscription | undefined;

  projectTitle: ProjectTitle | undefined
  applicationLinks: ApplicationLink[] = [];

  constructor(private sentJson: JsonServiceService) { }

  ngOnInit(): void {
    // Subscribe to JSON data changes
    this.jsonData = this.sentJson.getJsonData();
    this.projectTitle=this.jsonData.projectTitle[0].title
    this.applicationLinks=this.jsonData.applicationLinks
    console.log('Received Project Title is data:', this.projectTitle);
    console.log('Received Application LInks are:', this.applicationLinks);
  }



}
