import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcrescimoComponent } from './acrescimo.component';

describe('AcrescimoComponent', () => {
  let component: AcrescimoComponent;
  let fixture: ComponentFixture<AcrescimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcrescimoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcrescimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
