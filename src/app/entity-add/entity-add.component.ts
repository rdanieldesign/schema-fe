import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAddFormModule } from '../entity-add-form/entity-add-form.module';
import { IEntity, IEntityValueMap } from '../entity/entity.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ISchemaDetail } from '../schema/schema.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-add',
  standalone: true,
  imports: [EntityAddFormModule, HttpClientModule, CommonModule],
  templateUrl: './entity-add.component.html',
  styleUrl: './entity-add.component.css',
})
export class EntityAddComponent {
  schema: ISchemaDetail | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get<ISchemaDetail>(
        `/schema/schema-definitions/${this.route.snapshot.paramMap.get(
          'schemaId'
        )}`
      )
      .subscribe((schema) => {
        this.schema = schema;
      });
  }

  onSubmit(valueMap: IEntityValueMap) {
    this.http
      .post<IEntity>(`/schema/entities`, {
        schemaId: this.schema?.id,
        valueMap,
      })
      .subscribe((res) => {
        this.router.navigate([`../${res.id}`], { relativeTo: this.route });
      });
  }
}
