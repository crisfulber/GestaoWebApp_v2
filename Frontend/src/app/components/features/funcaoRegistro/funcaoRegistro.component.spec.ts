import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoRegistroComponent } from './funcaoRegistro.component';

describe('FuncaoRegistroComponent', () => {
  let component: FuncaoRegistroComponent;
  let fixture: ComponentFixture<FuncaoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncaoRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
