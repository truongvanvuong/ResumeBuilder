import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actionlink',
  imports: [],
  templateUrl: './actionlink.html',
  styleUrl: './actionlink.css',
})
export class Actionlink {

  @Input() title: string = ''
  @Input() link: string = ''

}
