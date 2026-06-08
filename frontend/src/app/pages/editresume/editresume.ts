import { Resume } from './../../types/Resumes';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

import { Resume as ResumeService } from '../../services/resume';

import { Profileinfo } from '../resumeFroms/profileinfo/profileinfo';
import { Contactinfo } from '../resumeFroms/contactinfo/contactinfo';
import { Workexperience } from '../resumeFroms/workexperience/workexperience';
import { EducationDetails } from '../resumeFroms/education-details/education-details';
import { Skills } from '../resumeFroms/skills/skills';
import { Project } from '../resumeFroms/project/project';
import { certifications } from '../resumeFroms/certifications/certifications';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../resumeFroms/languages/languages';
import { Renderresume } from '../../components/ResumeTemplates/renderresume/renderresume';
import { InputField } from '../../components/input-field/input-field';

@Component({
  selector: 'app-editresume',
  imports: [
    ButtonModule,
    ProgressBarModule,
    ReactiveFormsModule,
    Profileinfo,
    Contactinfo,
    Workexperience,
    EducationDetails,
    Skills,
    Project,
    certifications,
    Languages,
    Renderresume,
    InputField,
  ],
  templateUrl: './editresume.html',
  styleUrl: './editresume.css',
})
export class Editresume {
  resumeId: string = '';
  resumeForm!: FormGroup;
  isLoading: boolean = true;
  isEdititle: boolean = false;
  private sub?: Subscription;
  currentSection: number = 0;
  ValueProgressBar: number = 100 / 8;
  valueStep: number = 100 / 8;
  private sections = [
    'profile', // 0
    'contact', // 1
    'work', // 2
    'education', // 3
    'skills', // 4
    'projects', // 5
    'certifications', // 6
    'languages',
  ];
  sectionError: { [key: number]: string } = {};
  get isFirstStep(): boolean {
    return this.currentSection === 0;
  }
  get isLastStep(): boolean {
    return this.currentSection === this.sections.length - 1;
  }
  nextStep() {
    if (!this.isLastStep) {
      this.currentSection++;
      this.ValueProgressBar = this.ValueProgressBar + this.valueStep;
    }
  }
  previousStep() {
    if (!this.isFirstStep) {
      this.currentSection--;
      this.ValueProgressBar = this.ValueProgressBar - this.valueStep;
    }
  }

  onCancelEditTitle() {
    this.isEdititle = !this.isEdititle;
  }
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  constructor(
    private route: ActivatedRoute,
    private resumeServices: ResumeService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  handleEditTitile() {
    this.isEdititle = true;
    this.titleInput.nativeElement.focus();
  }
  getFormArray(name: string): FormArray {
    return this.resumeForm.get(name) as FormArray;
  }
  private createForm() {
    this.resumeForm = this.fb.group({
      title: ['', Validators.required],
      thumbnail: [''],
      profileInfo: this.fb.group({
        profileImg: [''],
        previewUrl: [''],
        fullName: ['', Validators.required],
        designation: ['', Validators.required],
        summary: ['', Validators.required],
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', [Validators.required]],
        linkedin: [''],
        github: [''],
        website: [''],
      }),
      workExperience: this.fb.array([
        this.fb.group({
          company: ['', Validators.required],
          role: ['', Validators.required],
          startDate: [''],
          endDate: [''],
          description: [''],
        }),
      ]),
      education: this.fb.array([
        this.fb.group({
          degree: [''],
          institution: [''],
          startDate: [''],
          endDate: [''],
          major: [''],
        }),
      ]),
      skills: this.fb.array([
        this.fb.group({
          name: [''],
          level: [''],
        }),
      ]),
      references: this.fb.array([
        this.fb.group({
          fullName: [''],
          company: [''],
          email: [''],
          phone: [''],
        }),
      ]),
      projects: this.fb.array([
        this.fb.group({
          name: [''],
          description: [''],
          github: [''],
          liveDemo: [''],
        }),
      ]),
      certifications: this.fb.array([
        this.fb.group({
          name: [''],
          issuer: [''],
          year: [''],
        }),
      ]),
      languages: this.fb.array([
        this.fb.group({
          name: [''],
          level: [''],
        }),
      ]),
    });
  }
  addRequiredError = (formName: string, field: string, msg: string, error: string[]) => {
    const from = this.resumeForm?.get(formName);
    const ctrl = from?.get(field);
    if (ctrl?.hasError('required')) {
      error.push(msg);
    }
    if (formName === 'contactInfo' && field === 'email') {
      if (ctrl?.hasError('email')) {
        error.push('Invalid email');
      }
    }
  };
  addArrayRequiredError(arrayName: string, field: string, error: string[]) {
    const array = this.resumeForm?.get(arrayName) as FormArray;
    if (!array) return;

    array.controls.forEach((groupCtrl, index) => {
      const group = groupCtrl as FormGroup;
      const crtl = group.get(field);
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
      if (crtl?.hasError('required')) {
        error.push(`${capitalize(field)} is required in ${index + 1} `);
      }
    });
  }
  vadidateAndNext() {
    const error: string[] = [];

    switch (this.currentSection) {
      case 0:
        this.addRequiredError('profileInfo', 'fullName', 'Full name is required', error);
        this.addRequiredError('profileInfo', 'designation', 'Designation is required', error);
        this.addRequiredError('profileInfo', 'summary', 'Summary is required', error);
        break;
      case 1:
        this.addRequiredError('contactInfo', 'email', 'Email is required', error);
        this.addRequiredError('contactInfo', 'phone', 'Phone is required', error);
        this.addRequiredError('contactInfo', 'address', 'Address is required', error);
        break;

      default:
        break;
    }

    if (error.length > 0) {
      this.sectionError[this.currentSection] = error.join(', ');
      return;
    }

    delete this.sectionError[this.currentSection];
    this.nextStep();
  }

  get profileInfo(): FormGroup {
    return this.resumeForm.get('profileInfo') as FormGroup;
  }
  get workExperience(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }
  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }
  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }
  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }
  get certifications(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }
  get languages(): FormArray {
    return this.resumeForm.get('languages') as FormArray;
  }
  get references(): FormArray {
    return this.resumeForm.get('references') as FormArray;
  }
  get contactInfo(): FormGroup {
    return this.resumeForm.get('contactInfo') as FormGroup;
  }
  log() {
    console.log(this.sectionError);
  }
  ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.resumeId) {
      this.isLoading = true;
      this.sub = this.resumeServices
        .getResume(this.resumeId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (data: Resume) => {
            this.patchResumeData(data);
          },
          error: (err) => {
            console.error('Error fetching resumes in dashboard:', err);
          },
        });
    }
  }
  private patchResumeData(data: Resume) {
    this.resumeForm.patchValue({
      title: data.title,
      thumbnail: data.thumbnail,
      profileInfo: data.profileInfo,
      contactInfo: data.contactInfo,
    });
    this.clearAndPatchArray(this.workExperience, data.workExperience || [], 'workExperience');
    this.clearAndPatchArray(this.education, data.education || [], 'education');
    this.clearAndPatchArray(this.skills, data.skills || [], 'skills');
    this.clearAndPatchArray(this.projects, data.projects || [], 'projects');
    this.clearAndPatchArray(this.certifications, data.certifications || [], 'certifications');
    this.clearAndPatchArray(this.languages, data.languages || [], 'languages');
    this.clearAndPatchArray(this.references, data.references || [], 'references');
    if (this.references.length === 0) {
      this.references.push(this.createItemGroup('references'));
    }
  }
  private clearAndPatchArray(formArray: FormArray, items: any[], sectionName: string) {
    formArray.clear();
    items.forEach((item) => {
      const group = this.createItemGroup(sectionName, item);
      formArray.push(group);
    });
  }
  private createItemGroup(sectionName: string, item: any = {}): FormGroup {
    switch (sectionName) {
      case 'workExperience':
        return this.fb.group({
          company: [item.company || ''],
          role: [item.role || ''],
          startDate: [item.startDate || ''],
          endDate: [item.endDate || ''],
          description: [item.description || ''],
        });
      case 'education':
        return this.fb.group({
          major: [item.major || ''],
          degree: [item.degree || ''],
          institution: [item.institution || ''],
          startDate: [item.startDate || ''],
          endDate: [item.endDate || ''],
        });
      case 'skills':
        return this.fb.group({
          name: [item.name || ''],
          level: [item.level || ''],
        });
      case 'references':
        return this.fb.group({
          fullName: [item.fullName || ''],
          company: [item.company || ''],
          email: [item.email || ''],
          phone: [item.phone || ''],
        });
      case 'languages':
        return this.fb.group({
          name: [item.name || ''],
          level: [item.level || ''],
        });
      case 'projects':
        return this.fb.group({
          name: [item.name || ''],
          description: [item.description || ''],
          github: [item.github || ''],
          liveDemo: [item.liveDemo || ''],
        });
      case 'certifications':
        return this.fb.group({
          name: [item.name || ''],
          issuer: [item.issuer || ''],
          year: [item.year || ''],
        });
      // Tương tự cho projects, certifications, languages, interests...
      default:
        return this.fb.group({ name: [item.name || ''] }); // fallback
    }
  }
  addItem(sectionName: string) {
    const array = this.getFormArray(sectionName);
    const newItem = this.createItemGroup(sectionName);
    if (array) {
      array.push(newItem);
    }
  }
  removeItem(sectionName: string, index: number) {
    const array = this.getFormArray(sectionName);
    if (array && index >= 0 && index < array.length) {
      array.removeAt(index);
    }
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
