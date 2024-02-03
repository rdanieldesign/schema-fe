import { Injectable } from '@angular/core';
import { IEntityValue, IEntityValueMap } from './entity.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { FormControl } from '@angular/forms';
import { AttributeValueTypes } from '../attribute/attribute.enum';

@Injectable({
  providedIn: 'root',
})
export class EntityValueService {
  getFormGroupFromValueMap(
    attributes: ISchemaAttribute[] | undefined,
    valueMap: IEntityValueMap = {}
  ) {
    if (!(attributes && valueMap)) {
      return {};
    }
    return attributes.reduce((controlMap, attribute) => {
      return {
        ...controlMap,
        [attribute.id]: this.getFormControlFromValueMap(valueMap, attribute),
      };
    }, {});
  }
  getFormControlFromValueMap(
    valueMap: IEntityValueMap | undefined,
    attribute: ISchemaAttribute
  ) {
    switch (attribute.valueType) {
      case AttributeValueTypes.MULTI_SELECT: {
        return new FormControl(valueMap?.[attribute.id]);
      }
      case AttributeValueTypes.SINGLE_SELECT: {
        return new FormControl(valueMap?.[attribute.id]);
      }
      default:
        return new FormControl(valueMap?.[attribute.id]);
    }
  }
}
