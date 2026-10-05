import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Templateone } from './templateone';

describe('Templateone', () => {
  let component: Templateone;
  let fixture: ComponentFixture<Templateone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Templateone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Templateone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
