import { ComponentFixture, TestBed } from '@angular/core/testing';

import { certifications } from './certifications';

describe('certifications', () => {
  let component: certifications;
  let fixture: ComponentFixture<certifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [certifications],
    }).compileComponents();

    fixture = TestBed.createComponent(certifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
