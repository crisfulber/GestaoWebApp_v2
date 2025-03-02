import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadostrabalhoComponent } from './dadostrabalho.component';

describe('DadostrabalhoComponent', () => {
  let component: DadostrabalhoComponent;
  let fixture: ComponentFixture<DadostrabalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadostrabalhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadostrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
