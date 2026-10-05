import { Component, Input } from '@angular/core';

import { Skill } from '../../../types/resumes'

@Component({
  selector: 'app-skillsection',
  imports: [],
  templateUrl: './skillsection.html',
  styleUrl: './skillsection.css',
})
export class Skillsection {
  @Input() skills: Skill[] = [];
}
