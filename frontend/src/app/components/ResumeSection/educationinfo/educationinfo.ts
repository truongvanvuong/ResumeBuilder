import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-educationinfo',
  imports: [],
  templateUrl: './educationinfo.html',
  styleUrl: './educationinfo.css',
})
export class Educationinfo {
  @Input() degree: string = '';
  @Input() institution: string = '';
  @Input() duration: string = '';


}
