import { Component } from '@angular/core';
import { IEntityDetail } from '../entity/entity.interface';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { EntityLabelPipe } from '../entity/entity-label.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-detail',
  standalone: true,
  imports: [HttpClientModule, EntityLabelPipe, RouterModule, CommonModule],
  templateUrl: './entity-detail.component.html',
  styleUrl: './entity-detail.component.css',
})
export class EntityDetailComponent {
  entity: IEntityDetail | undefined;
  primaryAttribute: ISchemaAttribute | undefined;
  secondaryAttributeOptionMap: { [key: string]: ISchemaAttribute } = {};
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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
        this.secondaryAttributeOptionMap = secondaryOptionAttributes.reduce(
          (attributeMap, attribute) => {
            return { ...attributeMap, [attribute.id]: attribute };
          },
          {}
        );
      });
  }
}
