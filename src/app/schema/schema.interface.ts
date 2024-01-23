import { ISchemaAttribute } from '../attribute/attribute.interface';
import { IPageResponse } from '../shared/shared.interface';

export interface ISchema {
  id: string;
  name: string;
}

export interface ISchemaDetail extends ISchema {
  attributes: ISchemaAttribute[];
}

export interface ISchemaListReponse extends IPageResponse<ISchema> {}
