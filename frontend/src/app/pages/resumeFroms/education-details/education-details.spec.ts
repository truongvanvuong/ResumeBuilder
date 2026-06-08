import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDetails } from './education-details';

describe('EducationDetails', () => {
  let component: EducationDetails;
  let fixture: ComponentFixture<EducationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
