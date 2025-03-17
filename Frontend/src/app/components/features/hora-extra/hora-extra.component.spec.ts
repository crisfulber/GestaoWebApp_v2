import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraExtraComponent } from './hora-extra.component';

describe('HoraExtraComponent', () => {
  let component: HoraExtraComponent;
  let fixture: ComponentFixture<HoraExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoraExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
