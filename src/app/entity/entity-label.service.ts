import { Injectable } from '@angular/core';
import { IEntityValue } from './entity.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { AttributeValueTypes } from '../attribute/attribute.enum';

@Injectable({
  providedIn: 'root',
})
export class EntityLabelService {
  constructor() {}

  getLabel(
    values: IEntityValue[] | undefined,
    attribute: ISchemaAttribute
  ): string | undefined {
    return this.getLabelIdSegments(values, attribute).reduce(
      (label, segment, index) => {
        if (!segment?.label) {
          return label;
        }
        if (index !== 0) {
          label += ', ';
        }
        return label + segment?.label;
      },
      ''
    );
  }

  getLabelIdSegments(
    values: IEntityValue[] | undefined,
    attribute: ISchemaAttribute
  ): Array<{ label: string; id?: string }> {
    switch (attribute.valueType) {
      case AttributeValueTypes.SINGLE_SELECT:
      case AttributeValueTypes.MULTI_SELECT: {
        return values?.map((val) => ({ label: val.value, id: val.id })) || [];
      }
      case AttributeValueTypes.NUMBER:
      case AttributeValueTypes.HTML:
      case AttributeValueTypes.DATE:
      case AttributeValueTypes.DATE_TIME:
      case AttributeValueTypes.TEXT:
      case AttributeValueTypes.TEXT_LONG:
      default:
        return values?.map((val) => ({ label: val.value })) || [];
    }
  }
}
