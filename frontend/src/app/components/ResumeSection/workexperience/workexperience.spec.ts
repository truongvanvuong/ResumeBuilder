import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workexperience } from './workexperience';

describe('Workexperience', () => {
  let component: Workexperience;
  let fixture: ComponentFixture<Workexperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workexperience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workexperience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
