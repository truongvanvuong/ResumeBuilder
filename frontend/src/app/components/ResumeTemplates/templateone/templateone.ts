import { Component, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, SimpleChanges, OnInit } from '@angular/core';
import { NgTemplateOutlet } from "@angular/common";

import { AvatarModule } from 'primeng/avatar';

import { Contactinfo } from '../../ResumeSection/contactinfo/contactinfo'
import { Educationinfo } from '../../ResumeSection/educationinfo/educationinfo'
import { Workexperience } from '../../ResumeSection/workexperience/workexperience'
import { Projectinfo } from '../../ResumeSection/projectinfo/projectinfo'
import { Skillsection } from '../../ResumeSection/skillsection/skillsection'
import { Certificationinfo } from '../../ResumeSection/certificationinfo/certificationinfo'


import { Resume } from '../../../types/resumes';
import { formatYearMonth } from '../../../shared/utils/formatYearMonth';
import { Languagesection } from "../../ResumeSection/languagesection/languagesection";

@Component({
  selector: 'app-templateone',
  imports: [Contactinfo, AvatarModule, Projectinfo, Skillsection, Educationinfo, NgTemplateOutlet, Certificationinfo, Workexperience, Languagesection],
  templateUrl: './templateone.html',
  styleUrl: './templateone.css',
})
export class Templateone implements OnInit, AfterViewInit, OnChanges {
  @Input() resumeData?: Resume;
  @Input() colorPalette: string[] = [];
  @Input() containerWidth!: number;

  DEFAULT_THEME: string[] = ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'];

  @ViewChild('resumeRef') resumeRef!: ElementRef;

  themeColors: string[] = [];
  baseWidth: number = 800;
  scale: number = 1;
  ngOnInit() {
    this.themeColors = this.colorPalette.length > 0 ? this.colorPalette : this.DEFAULT_THEME;
  }
  ngAfterViewInit() {
    this.calculateScale();
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes['containerWidth'] && !changes['containerWidth'].isFirstChange()) {
      this.calculateScale();
    }
  }
  private calculateScale() {
    if (!this.resumeRef) return;

    const actualBaseWidth = this.resumeRef.nativeElement.offsetWidth;
    this.baseWidth = actualBaseWidth;
    if (actualBaseWidth > 0) {
      this.scale = this.containerWidth / actualBaseWidth;
    }
  }

  getDuration(start: string | null, end: string | null): string {
    if (!start && !end) {
      return '';
    }
    const formattedStart = start ?? '';
    const formattedEnd = end ?? '';
    return `${formatYearMonth(formattedStart)} - ${formatYearMonth(formattedEnd)}`;
  }
}
