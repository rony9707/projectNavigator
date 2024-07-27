import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JsonServiceService } from 'src/app/services/json-service.service';
import { ApplicationLink, DownloadLink, OtherLink, ProjectTitle } from './home.interface';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  jsonData: any;
  private subscription: Subscription | undefined;

  projectTitle: ProjectTitle | undefined
  applicationLinks: ApplicationLink[] = [];
  otherLinks: OtherLink[] = [];
  downloadLinks: DownloadLink[] = [];

  constructor(private sentJson: JsonServiceService, public musicService: MusicService) { }

  music_status = this.musicService.music_status;

  ngOnInit(): void {
    // Subscribe to JSON data changes
    this.jsonData = this.sentJson.getJsonData();
    this.projectTitle=this.jsonData.projectTitle[0].title
    this.applicationLinks=this.jsonData.applicationLinks
    this.otherLinks=this.jsonData.otherLinks
    this.downloadLinks=this.jsonData.downloadLinks
    // console.log('Received Project Title is data:', this.projectTitle);
    // console.log('Received Application LInks are:', this.applicationLinks);
    // console.log('Received Other Links are:', this.otherLinks);
    // console.log('Received Download Links are:', this.downloadLinks);
  }

  ngAfterViewInit() {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.play();
    }
  }

  musicplay(){
    this.music_status=!this.musicService.music_status
    this.musicService.musicStartStop(!this.musicService.music_status);
  }

  volumeLevel(event:any){
    this.musicService.adjustVolumeSong(event.value)
  }


}
