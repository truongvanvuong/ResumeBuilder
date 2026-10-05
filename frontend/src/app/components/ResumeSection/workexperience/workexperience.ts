import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workexperience',
  imports: [],
  templateUrl: './workexperience.html',
  styleUrl: './workexperience.css',
})
export class Workexperience {

  @Input() company: string = ""
  @Input() role: string = ""
  @Input() duration: string = ""
  @Input() durationColor: string = ""
  @Input() description: string = ""

}
