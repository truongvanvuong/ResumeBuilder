import { Component, Input } from '@angular/core';

import { Resume } from '../../../types/resumes';

@Component({
  selector: 'app-templatethree',
  imports: [],
  templateUrl: './templatethree.html',
  styleUrl: './templatethree.css',
})
export class Templatethree {
  @Input() resumeData?: Resume;
}
