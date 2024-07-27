import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { JsonServiceService } from '../services/json-service.service';
import { MusicService } from '../services/music.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(private router: Router, public sentJson: JsonServiceService, public musicService: MusicService) { }

  selectedFile: File | null = null;
  jsonData: any = null;
  fileName: string = '';
  fileSize: number = 0;
  itemToDownload = "assets/demo_template.json"
  music_status = this.musicService.music_status;
  musicUrl=""

  ngOnInit(): void {
  }
  


  onFileSelected(event: any): void {
    //If more than one file is recevied, it will throw error
    if (event.target.files.length > 1) {
      swal.fire({
        title: "Error",
        text: 'Please upload only one file',
        icon: "error",
        timer: 1500, // Auto close after 2 seconds
        timerProgressBar: true, // Show progress bar
        showConfirmButton: false // Hide the "OK" button
      });
    }

    //Select file here
    else {
      const file: File = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.fileSize = event.target.files[0].size;
      if (file && file.type === 'application/json') {
        this.selectedFile = file;
        this.readJsonFile(file);
      } else {
        swal.fire({
          title: "Error",
          text: 'Please select a valid JSON file.',
          icon: "error",
          timer: 1500, // Auto close after 2 seconds
          timerProgressBar: true, // Show progress bar
          showConfirmButton: false // Hide the "OK" button
        });
      }
    }


  }


  readJsonFile(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        this.jsonData = JSON.parse(fileReader.result as string);
        // Handle form submission with JSON data
        this.sentJson.setJsonData(this.jsonData);
        //console.log(this.musicUrl)
      } catch (error) {
        alert(error)
        swal.fire({
          title: "Error",
          text: 'Error reading JSON file',
          icon: "error",
          timer: 1500, // Auto close after 2 seconds
          timerProgressBar: true, // Show progress bar
          showConfirmButton: false // Hide the "OK" button
        });
      }
    };
    fileReader.readAsText(file);
  }


  //Button Submit 
  onSubmit(): void {
    if (this.jsonData) {
      this.router.navigate(['home']);
    } else {
      swal.fire({
        title: "Error",
        text: 'No file is selected',
        icon: "error",
        timer: 1500, // Auto close after 2 seconds
        timerProgressBar: true, // Show progress bar
        showConfirmButton: false // Hide the "OK" button
      });
    }
  }


  //Go diretly to home with this button click if data is present in localhost
  goDirectlyToHome() {
    if (this.sentJson.getJsonData() != null) {
      this.router.navigate(['home']);
    }
  }



  musicplay() {
    this.music_status = !this.musicService.music_status
    this.musicService.musicStartStop(!this.musicService.music_status);
  }

  volumeLevel(event:any){
    this.musicService.adjustVolumeSong(event.value)
  }
}
