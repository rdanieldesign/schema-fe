import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormMultiSelectComponent } from './entity-form-multi-select.component';

describe('EntityFormMultiSelectComponent', () => {
  let component: EntityFormMultiSelectComponent;
  let fixture: ComponentFixture<EntityFormMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormMultiSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityFormMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
