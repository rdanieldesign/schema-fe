import {
  AttributeValidationTypes,
  AttributeValueTypes,
} from './attribute.enum';

export interface IAttribute {
  id: string;
  name: string;
  valueType: AttributeValueTypes;
  validationType: AttributeValidationTypes;
  optionEntityId: string;
}

export interface ISchemaAttribute extends IAttribute {
  isPrimary: boolean;
  isSecondary: boolean;
  required: boolean;
}
