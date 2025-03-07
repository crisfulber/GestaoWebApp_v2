import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolaridadeComponent } from './escolaridade.component';

describe('EscolaridadeComponent', () => {
  let component: EscolaridadeComponent;
  let fixture: ComponentFixture<EscolaridadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolaridadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolaridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
