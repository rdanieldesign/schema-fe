import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaAddComponent } from './schema-add.component';

describe('SchemaAddComponent', () => {
  let component: SchemaAddComponent;
  let fixture: ComponentFixture<SchemaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
