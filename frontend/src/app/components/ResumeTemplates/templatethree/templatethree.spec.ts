import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Templatethree } from './templatethree';

describe('Templatethree', () => {
  let component: Templatethree;
  let fixture: ComponentFixture<Templatethree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Templatethree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Templatethree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
