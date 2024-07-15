// src/app/other-links/other-links.component.ts
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Link, OtherLink, Copy } from '../home.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-other-links',
  templateUrl: './other-links.component.html',
  styleUrls: ['./other-links.component.css']
})
export class OtherLinksComponent implements OnInit {

  @Input() OtherLink: OtherLink[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  isLink(item: OtherLink): item is Link {
    return 'linkUrl' in item;
  }

  isCopy(item: OtherLink): item is Copy {
    return 'copyFlag' in item;
  }

  copyText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');

    swal.fire({
      text: 'Copied to Clipboard!',
      icon: 'success',
      timer: 1500, // Auto close after 1.5 seconds
      timerProgressBar: true, // Show progress bar
      showConfirmButton: false, // Hide the "OK" button
      toast: true, // Make it a toast notification
      position: 'top-end', // Position it at the top end
      background: '#f0f0f0', // Custom background color
      iconColor: '#000000', // Custom icon color for success/error
      customClass: {
        popup: 'swal2-custom-popup' // Add custom CSS class
      },
      didOpen: () => {
        const progressBar = swal.getTimerProgressBar();
        if (progressBar) {
          progressBar.style.background = '#000000'; // Custom progress bar color
        }
      }
    });

    document.body.removeChild(textarea);
  }
}
