import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contactinfo',
  imports: [],
  templateUrl: './contactinfo.html',
  styleUrl: './contactinfo.css',
})
export class Contactinfo {
  @Input() iconClass: string = '';
  @Input() iconBG: string = '';
  @Input() value: string | number = '';
}
