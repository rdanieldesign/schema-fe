import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IEntity, IEntityListReponse } from '../entity/entity.interface';
import { forkJoin, map } from 'rxjs';
import { ISchema, ISchemaDetail } from '../schema/schema.interface';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { EntityLabelPipe } from '../entity/entity-label.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [HttpClientModule, EntityLabelPipe, RouterModule, CommonModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.css',
})
export class EntityListComponent {
  entities: IEntity[] | undefined;
  schema: ISchema | undefined;
  primaryAttribute: ISchemaAttribute | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const schemaId = this.route.snapshot.paramMap.get('schemaId') as string;
    const params = { params: new HttpParams().set('schemaId', schemaId) };
    forkJoin([
      this.http
        .get<IEntityListReponse>('/schema/entities', params)
        .pipe(map((res) => res.data)),
      this.http.get<ISchemaDetail>(`/schema/schema-definitions/${schemaId}`),
    ]).subscribe(([entities, schema]) => {
      this.entities = entities;
      this.schema = schema;
      this.primaryAttribute =
        schema.attributes.find((attribute) => attribute.isPrimary) ||
        schema.attributes[0];
    });
  }

  addEntity() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
