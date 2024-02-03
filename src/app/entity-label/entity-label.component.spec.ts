import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLabelComponent } from './entity-label.component';

describe('EntityLabelComponent', () => {
  let component: EntityLabelComponent;
  let fixture: ComponentFixture<EntityLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
