import { Pipe, PipeTransform } from '@angular/core';
import { ISchemaAttribute } from './attribute.interface';

@Pipe({
  name: 'attributeFilter',
  standalone: true,
})
export class AttributeFilterPipe implements PipeTransform {
  transform(
    attributes: ISchemaAttribute[] | undefined,
    showPrimary = true,
    showSecondary = true,
    showOther = false
  ): ISchemaAttribute[] {
    return (
      attributes?.filter((attribute) => {
        return (
          (attribute.isPrimary && showPrimary) ||
          (attribute.isSecondary && showSecondary) ||
          (!attribute.isSecondary && !attribute.isPrimary && showOther)
        );
      }) || []
    );
  }
}
