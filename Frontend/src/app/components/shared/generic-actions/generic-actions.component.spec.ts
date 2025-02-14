import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericActionsComponent } from './generic-actions.component';

describe('GenericActionsComponent', () => {
  let component: GenericActionsComponent;
  let fixture: ComponentFixture<GenericActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
