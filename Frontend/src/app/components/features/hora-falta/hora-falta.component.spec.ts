import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraFaltaComponent } from './hora-falta.component';

describe('HoraFaltaComponent', () => {
  let component: HoraFaltaComponent;
  let fixture: ComponentFixture<HoraFaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoraFaltaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
