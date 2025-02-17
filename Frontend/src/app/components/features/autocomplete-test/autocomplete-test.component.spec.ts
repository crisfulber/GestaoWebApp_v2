import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteTestComponent } from './autocomplete-test.component';

describe('AutocompleteTestComponent', () => {
  let component: AutocompleteTestComponent;
  let fixture: ComponentFixture<AutocompleteTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
