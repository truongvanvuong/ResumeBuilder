import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Progress {
  private progressSubject = new BehaviorSubject<{ isHidden: boolean; value: number }>({
    isHidden: true,
    value: 0,
  });
  progress$ = this.progressSubject.asObservable();
  private interval: any;

  startProgress(startValue: number = 10): Promise<void> {
    this.clear();
    return new Promise((resolve) => {
      let currentValue = startValue;
      this.progressSubject.next({ isHidden: false, value: currentValue });
      this.interval = setInterval(() => {
        currentValue += 10;
        this.progressSubject.next({ isHidden: false, value: currentValue });
        if (currentValue >= 100) {
          this.clear();
          setTimeout(() => {
            resolve();
          }, 800);
        }
      }, 200);
    });
  }

  hide() {
    this.clear();
    this.progressSubject.next({ isHidden: true, value: 0 });
  }

  private clear() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
