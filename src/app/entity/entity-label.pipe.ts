import { Pipe, PipeTransform } from '@angular/core';
import { IEntityValueMap } from './entity.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { EntityLabelService } from './entity-label.service';

@Pipe({
  name: 'entityLabel',
  standalone: true,
})
export class EntityLabelPipe implements PipeTransform {
  constructor(private entityLabelService: EntityLabelService) {}
  transform(
    valueMap?: IEntityValueMap,
    primaryAttribute?: ISchemaAttribute
  ): string | undefined {
    if (!valueMap || !primaryAttribute) {
      return '';
    }
    return this.entityLabelService.getLabel(
      valueMap[primaryAttribute.id],
      primaryAttribute
    );
  }
}
