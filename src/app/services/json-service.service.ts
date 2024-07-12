import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor() { }

  private localStorageKey = 'jsonData_Project';

  setJsonData(data: any): void {
    localStorage.removeItem(this.localStorageKey);
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getJsonData(): any {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : null;
  }
}
