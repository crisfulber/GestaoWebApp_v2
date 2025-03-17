import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHoraComponent } from './tipo-hora.component';

describe('TipoHoraComponent', () => {
  let component: TipoHoraComponent;
  let fixture: ComponentFixture<TipoHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoHoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
