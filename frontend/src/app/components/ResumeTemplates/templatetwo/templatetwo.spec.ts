import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Templatetwo } from './templatetwo';

describe('Templatetwo', () => {
  let component: Templatetwo;
  let fixture: ComponentFixture<Templatetwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Templatetwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Templatetwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
