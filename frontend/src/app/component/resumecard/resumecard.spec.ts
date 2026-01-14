import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumecard } from './resumecard';

describe('Resumecard', () => {
  let component: Resumecard;
  let fixture: ComponentFixture<Resumecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resumecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resumecard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
