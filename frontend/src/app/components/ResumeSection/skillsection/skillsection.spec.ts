import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skillsection } from './skillsection';

describe('Skillsection', () => {
  let component: Skillsection;
  let fixture: ComponentFixture<Skillsection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skillsection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Skillsection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
