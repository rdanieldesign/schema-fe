import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeAssociateComponent } from './attribute-associate.component';

describe('AttributeAssociateComponent', () => {
  let component: AttributeAssociateComponent;
  let fixture: ComponentFixture<AttributeAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeAssociateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
