import { Component, Input } from '@angular/core';
import { Language } from '../../../types/resumes'

@Component({
  selector: 'app-languagesection',
  imports: [],
  templateUrl: './languagesection.html',
  styleUrl: './languagesection.css',
})
export class Languagesection {
  @Input() languages: Language[] = [];
}
