import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private audio = new Audio();
  music_status = false;
  musicUrl=''
  volume=100

  constructor() { }

  musicStartStop(status: boolean): void {
    const jsonData = localStorage.getItem('jsonData_Project');
    if (jsonData) {
      this.musicUrl=JSON.parse(jsonData).Music[0].song
    } else {
      console.log('No data found in localStorage.');
    }

    this.music_status = status;
    if (this.music_status) {
      if (this.musicUrl && this.audio.src !== this.musicUrl) {
        this.audio.src = this.musicUrl;
      }
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }


  adjustVolumeSong(volume:number){
    this.volume=volume
    console.log("Volumne is service",volume)
    this.audio.volume = this.volume / 100; 
  }


  getMusicURL(){
    const jsonData = localStorage.getItem('jsonData_Project');
    if (jsonData) {
      this.musicUrl=JSON.parse(jsonData).Music[0].song
    } else {
      console.log('No data found in localStorage.');
    }

    return this.musicUrl;
  }
}
