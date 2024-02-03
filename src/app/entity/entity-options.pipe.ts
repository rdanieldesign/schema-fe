import { HttpClient, HttpParams } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEntityListReponse, IEntityValue } from './entity.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { EntityLabelService } from './entity-label.service';

@Pipe({
  name: 'entityOptions',
  standalone: true,
})
export class EntityOptionsPipe implements PipeTransform {
  constructor(
    private http: HttpClient,
    private entityLabelService: EntityLabelService
  ) {}

  transform(
    schemaId: string,
    primaryAttribute: ISchemaAttribute
  ): Observable<IEntityValue[]> {
    const params = { params: new HttpParams().set('schemaId', schemaId) };
    return this.http.get<IEntityListReponse>('/schema/entities', params).pipe(
      map((res) =>
        res.data.map((entity) => ({
          id: entity.id,
          value:
            this.entityLabelService.getLabel(
              entity.valueMap[primaryAttribute.id],
              primaryAttribute
            ) || '',
        }))
      )
    );
  }
}
