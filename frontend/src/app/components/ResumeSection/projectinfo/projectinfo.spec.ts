import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectinfo } from './projectinfo';

describe('Projectinfo', () => {
  let component: Projectinfo;
  let fixture: ComponentFixture<Projectinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projectinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projectinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
