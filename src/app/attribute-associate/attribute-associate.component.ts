import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttributeValueTypes } from '../attribute/attribute.enum';
import { ISchema, ISchemaListReponse } from '../schema/schema.interface';
import { forkJoin, startWith } from 'rxjs';
import {
  IAttribute,
  IAttributeResponse,
} from '../attribute/attribute.interface';

@Component({
  selector: 'app-attribute-associate',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './attribute-associate.component.html',
  styleUrl: './attribute-associate.component.css',
})
export class AttributeAssociateComponent {
  schemaId = this.route.snapshot.queryParams['schemaId'];
  schemas: ISchema[] | undefined;
  attributes: IAttribute[] | undefined;
  attributeForm = new FormGroup({
    attribute: new FormControl(''),
    schema: new FormControl(this.schemaId || ''),
    isPrimary: new FormControl(false),
    isSecondary: new FormControl(false),
  });
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    forkJoin([
      this.http.get<ISchemaListReponse>('/schema/schema-definitions'),
      this.http.get<IAttributeResponse>('/schema/attributes'),
    ]).subscribe(([schemas, attributes]) => {
      this.schemas = schemas.data;
      this.attributes = attributes.data;
    });

    this.attributeForm.controls.isPrimary.valueChanges.subscribe((val) => {
      if (val) {
        this.attributeForm.controls.isSecondary.disable({ emitEvent: false });
      } else {
        this.attributeForm.controls.isSecondary.enable({ emitEvent: false });
      }
    });

    this.attributeForm.controls.isSecondary.valueChanges.subscribe((val) => {
      if (val) {
        this.attributeForm.controls.isPrimary.disable({ emitEvent: false });
      } else {
        this.attributeForm.controls.isPrimary.enable({ emitEvent: false });
      }
    });
  }

  onSubmit() {
    this.http
      .post<string>(
        `/schema/schema-definitions/${this.attributeForm.value.schema}/${this.attributeForm.value.attribute}`,
        {
          isPrimary: this.attributeForm.value.isPrimary,
          isSecondary: this.attributeForm.value.isSecondary,
        }
      )
      .subscribe((res) => {
        this.router.navigate(['/schemas', this.schemaId]);
      });
  }
}
