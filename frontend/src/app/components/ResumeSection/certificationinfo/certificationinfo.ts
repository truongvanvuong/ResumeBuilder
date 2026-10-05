import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-certificationinfo',
  imports: [],
  templateUrl: './certificationinfo.html',
  styleUrl: './certificationinfo.css',
})
export class Certificationinfo {
  @Input() title: string = ""
  @Input() issuer: string = ""
  @Input() year: string = ""
  @Input() bgColor: string = ""
}
