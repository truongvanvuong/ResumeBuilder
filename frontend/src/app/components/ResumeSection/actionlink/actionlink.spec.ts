import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actionlink } from './actionlink';

describe('Actionlink', () => {
  let component: Actionlink;
  let fixture: ComponentFixture<Actionlink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actionlink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actionlink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
