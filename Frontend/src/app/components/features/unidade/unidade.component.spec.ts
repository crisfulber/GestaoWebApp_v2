import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeComponent } from './unidade.component';

describe('UnidadeComponent', () => {
  let component: UnidadeComponent;
  let fixture: ComponentFixture<UnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
