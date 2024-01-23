import { Routes } from '@angular/router';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { SchemaDetailComponent } from './schema-detail/schema-detail.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';

export const routes: Routes = [
  {
    path: 'schemas',
    children: [
      {
        path: '',
        component: SchemaListComponent,
      },
      {
        path: ':schemaId',
        component: SchemaDetailComponent,
      },
    ],
  },
  {
    path: 'entities',
    children: [
      {
        path: '',
        component: EntityListComponent,
      },
      {
        path: ':entityId',
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
    ],
  },

  { path: '', redirectTo: '/schemas', pathMatch: 'full' },
];
