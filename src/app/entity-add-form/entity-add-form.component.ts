import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AttributeValueTypes } from '../attribute/attribute.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISchemaDetail } from '../schema/schema.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { IEntityValueMap } from '../entity/entity.interface';
import { Observable, map, of } from 'rxjs';
import { EntityValueService } from '../entity/entity-value.service';

@Component({
  selector: 'app-entity-add-form',
  templateUrl: './entity-add-form.component.html',
  styleUrl: './entity-add-form.component.css',
})
export class EntityAddFormComponent {
  @Input() valueMap: IEntityValueMap | undefined;
  @Input() schema!: ISchemaDetail | undefined;
  @Output() submit = new EventEmitter<IEntityValueMap>();

  attributeValueTypes = AttributeValueTypes;
  entityForm: FormGroup | undefined;
  schemaPrimaryAttributeMap: { [key: string]: ISchemaAttribute } = {};

  constructor(
    private readonly http: HttpClient,
    private readonly entityValueService: EntityValueService
  ) {}

  ngOnInit() {
    this.getSecondaryAttributeOptions(this.schema).subscribe((attributeMap) => {
      this.schemaPrimaryAttributeMap = attributeMap;
      const attributeControls =
        this.entityValueService.getFormGroupFromValueMap(
          this.schema?.attributes,
          this.valueMap
        );
      this.entityForm = new FormGroup(attributeControls || {});
    });
  }

  onSubmit() {
    this.submit.emit(this.entityForm?.value);
  }

  private getSecondaryAttributeOptions(schema?: ISchemaDetail): Observable<{
    [key: string]: ISchemaAttribute;
  }> {
    if (!schema) {
      return of({});
    }
    const secondaryOptionAttributeIds = schema.attributes.filter(
      (attribute) => attribute.isSecondary && attribute.optionEntityId
    );
    const secondayOptionIdString = secondaryOptionAttributeIds.length
      ? secondaryOptionAttributeIds
          .map((attribute) => attribute.optionEntityId)
          .join(',')
      : '';
    const params = {
      params: new HttpParams().set('schemaId', secondayOptionIdString),
    };
    const primaryAttributes = secondayOptionIdString
      ? this.http.get<ISchemaAttribute[]>(`/schema/attributes/primary`, params)
      : of([]);

    return primaryAttributes.pipe(
      map((attributes) =>
        attributes.reduce((attributeMap, attribute) => {
          return { ...attributeMap, [attribute.schemaId]: attribute };
        }, {})
      )
    );
  }
}
