import { Component, Input } from '@angular/core';

import { Resume } from '../../../types/resumes';


@Component({
  selector: 'app-templatetwo',
  imports: [],
  templateUrl: './templatetwo.html',
  styleUrl: './templatetwo.css',
})
export class Templatetwo {
  @Input() resumeData?: Resume;
}
