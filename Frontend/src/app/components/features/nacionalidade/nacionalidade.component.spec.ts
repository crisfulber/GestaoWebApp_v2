import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacionalidadeComponent } from './nacionalidade.component';

describe('NacionalidadeComponent', () => {
  let component: NacionalidadeComponent;
  let fixture: ComponentFixture<NacionalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NacionalidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NacionalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
