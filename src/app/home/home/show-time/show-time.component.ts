import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment-timezone';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.css'],
})
export class ShowTimeComponent implements OnInit, OnDestroy {

  @ViewChild('hourPicker1') hourPicker1!: ElementRef;
  @ViewChild('hourPicker2') hourPicker2!: ElementRef;
  @ViewChild('minutePicker1') minutePicker1!: ElementRef;
  @ViewChild('minutePicker2') minutePicker2!: ElementRef;

  @ViewChildren('am_pm') am_pm!: QueryList<ElementRef>;

  showtime = true;


  IST = '';
  UTC = '';
  CET = '';
  EST = '';

  private intervalId: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.startInterval();
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  toggleFaces(): void {
    this.showtime = !this.showtime;
    if (this.showtime) {
      this.startInterval();
    } else {
      this.stopInterval();
    }
  }

  private startInterval(): void {
    this.updateTimes(); // Update immediately on start
    this.intervalId = setInterval(() => {
      if (this.showtime) {
        this.updateTimes(); // Only update if showtime is true
      }
    }, 1000);
  }

  private stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTimes(): void {
    const now = new Date();
    this.UTC = now.toLocaleTimeString('en-US', { hour12: true, timeZone: 'UTC' });
    this.IST = now.toLocaleTimeString('en-US', { hour12: true, timeZone: 'Asia/Kolkata' });
    this.CET = now.toLocaleTimeString('en-US', { hour12: true, timeZone: 'Europe/Berlin' });
    this.EST = now.toLocaleTimeString('en-US', { hour12: true, timeZone: 'America/New_York' });
  }


  hourPicker() {

    let hourPicker1 = this.hourPicker1.nativeElement.value
    let hourPicker2 = this.hourPicker2.nativeElement.value
    let fullhour = hourPicker1 + hourPicker2

    if (fullhour > 12) {
      setTimeout(() => {
        this.hourPicker1.nativeElement.value = ''
        this.hourPicker2.nativeElement.value = ''
        this.hourPicker1.nativeElement.focus();
      }, 300)
    }

  }

  minutePicker() {
    let minutePicker1 = this.minutePicker1.nativeElement.value
    let minutePicker2 = this.minutePicker2.nativeElement.value
    let fullminute = minutePicker1 + minutePicker2

    if (fullminute > 59) {
      setTimeout(() => {
        this.minutePicker1.nativeElement.value = ''
        this.minutePicker2.nativeElement.value = ''
        this.minutePicker1.nativeElement.focus();
      }, 300)
    }
  }


  ampm: boolean = true; // Initialize ampm as true for AM
  toggleAmPm() {
    this.ampm = !this.ampm;
  }

  moveFocus(event: any, nextField: HTMLInputElement) {
    const inputLength = event.target.value.length;
    const maxLength = event.target.maxLength;

    if (inputLength >= maxLength) {
      nextField.focus();
    }
  }


  @ViewChild('convertTime') form!: NgForm
  selectedTimeZoneFrom='IST'
  selectedTimeZoneTo='UTC'
  convertedTime:string | undefined

  OnConvertTime() {
    if (this.form.valid) {
      let hour1 = this.form.value.hour1;
      let hour2 = this.form.value.hour2;
      let minute1 = this.form.value.minute1;
      let minute2 = this.form.value.minute2;
      let ampm = this.form.value.ampmtoggle;
      let ampm_value = ampm ? "AM" : "PM";
  
      let inputTime = `${hour1}${hour2}:${minute1}${minute2} ${ampm_value}`;
  
      let TimeZoneFrom = this.form.value.timeZoneSelectfrom;
      let TimeZoneTo = this.form.value.timeZoneSelectto;
  
      // Map your form values to moment-timezone compatible identifiers if needed
      let fromZone = this.mapTimeZoneIdentifier(TimeZoneFrom);
      let toZone = this.mapTimeZoneIdentifier(TimeZoneTo);
  
      // Perform the conversion
      let convertedTime = moment.tz(inputTime, 'hhmm A', fromZone).tz(toZone).format('hh:mm A');
      this.convertedTime=convertedTime
    } else {
      swal.fire({
        title: "Error",
        text: 'Please enter the full time',
        icon: "error",
        timer: 1500, // Auto close after 2 seconds
        timerProgressBar: true, // Show progress bar
        showConfirmButton: false // Hide the "OK" button
      });
      
    }
  }

  mapTimeZoneIdentifier(zone: string): string {
    switch (zone) {
      case 'IST':
        return 'Asia/Kolkata';
      case 'UTC':
        return 'UTC';
      case 'CET':
        return 'Europe/Paris';
      case 'EST':
        return 'America/New_York';
      default:
        return '';
    }
  }

}
