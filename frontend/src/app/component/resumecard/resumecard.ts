import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { getLightColorFromImage } from '../../shared/utils/getLightColor';

@Component({
  selector: 'app-resumecard',
  imports: [],
  templateUrl: './resumecard.html',
  styleUrl: './resumecard.css',
})
export class Resumecard implements OnChanges {
  // use a union type to allow null/undefined and provide a clear default
  @Input() imgUrl: string | null = null;
  @Input() title: string = '';
  @Input() lastUpdated: string = '';

  bgColor: string = '#fffff';
  constructor() {
    console.log(this.imgUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imgUrl']) {
      // set default image if imgUrl is null/undefined/empty
      if (this.imgUrl) {
        getLightColorFromImage(this.imgUrl)
          .then((color) => {
            this.bgColor = color;
          })
          .catch(() => {
            this.bgColor = '#ffffff';
          });
      }
    }
  }
}
