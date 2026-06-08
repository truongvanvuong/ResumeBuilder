import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Renderresume } from './renderresume';

describe('Renderresume', () => {
  let component: Renderresume;
  let fixture: ComponentFixture<Renderresume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Renderresume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Renderresume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
