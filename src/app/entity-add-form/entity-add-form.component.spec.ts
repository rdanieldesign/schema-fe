import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddFormComponent } from './entity-add-form.component';

describe('EntityAddFormComponent', () => {
  let component: EntityAddFormComponent;
  let fixture: ComponentFixture<EntityAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
