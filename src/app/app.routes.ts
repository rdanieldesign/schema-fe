import { Routes } from '@angular/router';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { SchemaDetailComponent } from './schema-detail/schema-detail.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { EntityAddComponent } from './entity-add/entity-add.component';
import { SchemaAddComponent } from './schema-add/schema-add.component';
import { AttributeAssociateComponent } from './attribute-associate/attribute-associate.component';

export const routes: Routes = [
  {
    path: 'schemas',
    children: [
      {
        path: '',
        component: SchemaListComponent,
      },
      {
        path: 'add',
        component: SchemaAddComponent,
      },
      {
        path: ':schemaId',
        component: SchemaDetailComponent,
      },
      {
        path: ':schemaId/entities',
        component: EntityListComponent,
      },
      {
        path: ':schemaId/entities/add',
        component: EntityAddComponent,
      },
      {
        path: ':schemaId/entities/:entityId',
        component: EntityDetailComponent,
      },
    ],
  },
  {
    path: 'attributes',
    children: [
      {
        path: 'add',
        component: AddAttributeComponent,
      },
      {
        path: 'associate',
        component: AttributeAssociateComponent,
      },
    ],
  },

  { path: '', redirectTo: '/schemas', pathMatch: 'full' },
];
