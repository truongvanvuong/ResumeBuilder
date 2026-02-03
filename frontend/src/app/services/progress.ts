import { CurrentUser } from './../types/user';
import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Progress {
  private progressSubject = new BehaviorSubject<{ show: boolean; value: number }>({
    show: true,
    value: 0,
  });
  progress$ = this.progressSubject.asObservable();
  startProgress(startValue: number = 10): Promise<void> {
    return new Promise((resolve) => {
      let curentValue = startValue;
      this.progressSubject.next({ show: false, value: curentValue });
      const interval = setInterval(() => {
        curentValue += 10;
        this.progressSubject.next({ show: false, value: curentValue });
        if (curentValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            resolve();
          }, 800);
        }
      }, 200);
    });
  }

  hide() {
    this.progressSubject.next({ show: true, value: 0 });
  }
}
