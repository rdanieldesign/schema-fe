import { ISchemaDetail } from '../schema/schema.interface';
import { IPageResponse } from '../shared/shared.interface';

export interface IEntity {
  id: string;
  createdDate: string;
  updatedDate: string;
  valueMap: IEntityValueMap;
}

export interface IEntityValueMap {
  [key: string]: IEntityValue[];
}

export interface IEntityValue {
  id?: string;
  value: string;
}

export interface IEntityDetail extends IEntity {
  schema: ISchemaDetail;
}

export interface IEntityListReponse extends IPageResponse<IEntity> {}

export interface IEntityUpdateResponse {
  message: string;
  valueMap: IEntityValueMap;
}
