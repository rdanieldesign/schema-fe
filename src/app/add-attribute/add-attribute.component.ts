import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttributeValueTypes } from '../attribute/attribute.enum';
import { ISchema, ISchemaListReponse } from '../schema/schema.interface';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-add-attribute',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-attribute.component.html',
  styleUrl: './add-attribute.component.css',
})
export class AddAttributeComponent {
  attributeForm = new FormGroup({
    name: new FormControl(''),
    valueType: new FormControl(AttributeValueTypes.TEXT),
    optionEntityId: new FormControl(null),
    required: new FormControl(false),
    isPrimary: new FormControl(false),
    isSecondary: new FormControl(false),
  });
  valueTypes = [
    { label: 'Text', id: AttributeValueTypes.TEXT },
    { label: 'Number', id: AttributeValueTypes.NUMBER },
    { label: 'Date', id: AttributeValueTypes.DATE },
    { label: 'Date Time', id: AttributeValueTypes.DATE_TIME },
    { label: 'Single Select', id: AttributeValueTypes.SINGLE_SELECT },
    { label: 'Multi Select', id: AttributeValueTypes.MULTI_SELECT },
  ];
  schemaId = this.route.snapshot.queryParams['schemaId'];
  schemas: ISchema[] | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get<ISchemaListReponse>('/schema/schema-definitions')
      .subscribe((res) => {
        this.schemas = res.data;
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

    this.attributeForm.controls.valueType.valueChanges
      .pipe(startWith(AttributeValueTypes.TEXT))
      .subscribe((val) => {
        if (
          val === AttributeValueTypes.MULTI_SELECT ||
          val === AttributeValueTypes.SINGLE_SELECT
        ) {
          this.attributeForm.controls.optionEntityId.enable({
            emitEvent: false,
          });
        } else {
          this.attributeForm.controls.optionEntityId.setValue(null);
          this.attributeForm.controls.optionEntityId.disable({
            emitEvent: false,
          });
        }
      });
  }

  onSubmit() {
    console.log(this.attributeForm.value);
    this.http
      .post<string>(`/schema/attributes`, {
        ...this.attributeForm.value,
        schemaId: this.schemaId,
      })
      .subscribe((res) => {
        this.router.navigate(['/schemas', this.schemaId]);
      });
  }
}
