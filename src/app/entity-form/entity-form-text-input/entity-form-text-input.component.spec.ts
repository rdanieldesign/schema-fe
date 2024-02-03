import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormTextInputComponent } from './entity-form-text-input.component';

describe('EntityFormTextInputComponent', () => {
  let component: EntityFormTextInputComponent;
  let fixture: ComponentFixture<EntityFormTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormTextInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityFormTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
