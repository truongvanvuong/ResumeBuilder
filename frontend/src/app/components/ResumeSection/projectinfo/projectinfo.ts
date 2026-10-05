import { Component, Input } from '@angular/core';

import { Actionlink } from '../actionlink/actionlink'
@Component({
  selector: 'app-projectinfo',
  imports: [Actionlink],
  templateUrl: './projectinfo.html',
  styleUrl: './projectinfo.css',
})
export class Projectinfo {
  @Input() name: string = ''
  @Input() description: string = ''
  @Input() github: string = ''
  @Input() liveDemo: string = ''
  @Input() bgColor: string = ''
  @Input() isPreview: boolean = false
}
