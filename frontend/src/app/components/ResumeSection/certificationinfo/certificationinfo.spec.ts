import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certificationinfo } from './certificationinfo';

describe('Certificationinfo', () => {
  let component: Certificationinfo;
  let fixture: ComponentFixture<Certificationinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certificationinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Certificationinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
