import { Component } from '@angular/core';
import {
  IEntityDetail,
  IEntityUpdateResponse,
  IEntityValueMap,
} from '../entity/entity.interface';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { EntityLabelPipe } from '../entity/entity-label.pipe';
import { CommonModule } from '@angular/common';
import { AttributeValueTypes } from '../attribute/attribute.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntityOptionsPipe } from '../entity/entity-options.pipe';
import { EntityValueService } from '../entity/entity-value.service';
import { EntityAddFormModule } from '../entity-add-form/entity-add-form.module';
import { AttributeFilterPipe } from '../attribute/attribute-filter.pipe';
import { EntityLabelModule } from '../entity-label/entity-label.module';

@Component({
  selector: 'app-entity-detail',
  standalone: true,
  imports: [
    HttpClientModule,
    EntityLabelPipe,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    EntityOptionsPipe,
    EntityAddFormModule,
    AttributeFilterPipe,
    EntityLabelModule,
  ],
  templateUrl: './entity-detail.component.html',
  styleUrl: './entity-detail.component.css',
})
export class EntityDetailComponent {
  entity: IEntityDetail | undefined;
  primaryAttribute: ISchemaAttribute | undefined;
  schemaPrimaryAttributeMap: { [schemaId: string]: ISchemaAttribute } = {};
  editMode = false;
  attributeValueTypes = AttributeValueTypes;
  attributeForm = new FormGroup({});

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private entityValueService: EntityValueService
  ) {
    this.route.paramMap.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    const entityId = this.route.snapshot.paramMap.get('entityId');
    this.http
      .get<IEntityDetail>(`/schema/entities/${entityId}`)
      .pipe(
        switchMap((entity: IEntityDetail) => {
          const secondaryOptionAttributeIds = entity.schema.attributes.filter(
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
            ? this.http.get<ISchemaAttribute[]>(
                `/schema/attributes/primary`,
                params
              )
            : of([]);
          return primaryAttributes.pipe(
            map((secondaryOptionAttributes) => ({
              secondaryOptionAttributes,
              entity,
            }))
          );
        })
      )
      .subscribe(({ entity, secondaryOptionAttributes }) => {
        this.entity = entity;
        this.primaryAttribute = entity.schema.attributes.find(
          (attribute) => attribute.isPrimary
        );
        this.schemaPrimaryAttributeMap = secondaryOptionAttributes.reduce(
          (attributeMap, attribute) => {
            return { ...attributeMap, [attribute.schemaId]: attribute };
          },
          {}
        );
      });
  }

  edit() {
    const attributeControls = this.entityValueService.getFormGroupFromValueMap(
      this.entity?.schema.attributes,
      this.entity?.valueMap
    );
    this.attributeForm = new FormGroup(attributeControls || {});
    this.editMode = true;
  }

  onSubmit(updatedValueMap: IEntityValueMap) {
    this.http
      .put<IEntityUpdateResponse>(
        `/schema/entities/${this.entity?.id}`,
        updatedValueMap
      )
      .subscribe(({ valueMap }) => {
        this.entity = { ...(this.entity as IEntityDetail), valueMap };
        this.editMode = false;
      });
  }
}
