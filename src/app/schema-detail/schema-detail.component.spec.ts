import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaDetailComponent } from './schema-detail.component';

describe('SchemaDetailComponent', () => {
  let component: SchemaDetailComponent;
  let fixture: ComponentFixture<SchemaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
