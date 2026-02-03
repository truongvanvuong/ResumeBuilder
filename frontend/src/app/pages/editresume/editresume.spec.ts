import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editresume } from './editresume';

describe('Editresume', () => {
  let component: Editresume;
  let fixture: ComponentFixture<Editresume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editresume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editresume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
