import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormSelectComponent } from './entity-form-select.component';

describe('EntityFormSelectComponent', () => {
  let component: EntityFormSelectComponent;
  let fixture: ComponentFixture<EntityFormSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
