import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profileinfo } from './profileinfo';

describe('Profileinfo', () => {
  let component: Profileinfo;
  let fixture: ComponentFixture<Profileinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profileinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profileinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
