import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-renderresume',
  imports: [],
  templateUrl: './renderresume.html',
  styleUrl: './renderresume.css',
})
export class Renderresume {
  @Input() templateId: string = '';
  @Input() resumeData = '';
  @Input() colorPalette = '';
  @Input() containerWitdth: number = 0;
}
