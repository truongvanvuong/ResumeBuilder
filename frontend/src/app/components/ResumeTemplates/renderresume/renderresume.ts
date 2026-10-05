import { Component, Input } from '@angular/core';

import { Resume } from '../../../types/resumes';

import { Templateone } from '../templateone/templateone';
import { Templatetwo } from '../templatetwo/templatetwo';
import { Templatethree } from '../templatethree/templatethree';

@Component({
  selector: 'app-renderresume',
  imports: [Templateone, Templatetwo, Templatethree],
  templateUrl: './renderresume.html',
  styleUrl: './renderresume.css',
})
export class Renderresume {
  @Input() templateId: string = '';
  @Input() resumeData?: Resume;
  @Input() colorPalette = '';
  @Input() containerWidth: number = 0;
}
