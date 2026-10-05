import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Languagesection } from './languagesection';

describe('Languagesection', () => {
  let component: Languagesection;
  let fixture: ComponentFixture<Languagesection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Languagesection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Languagesection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
