import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { JsonServiceService } from '../services/json-service.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(private router: Router, public sentJson: JsonServiceService) { }

  selectedFile: File | null = null;
  jsonData: any = null;
  fileName: string = '';
  fileSize: number = 0;
  itemToDownload="assets/demo_template.json"
  
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
      } catch (error) {
        console.log(error)
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
      // Handle form submission with JSON data
      this.sentJson.setJsonData(this.jsonData);
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

}
