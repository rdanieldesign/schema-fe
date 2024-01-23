import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ISchema, ISchemaListReponse } from '../schema/schema.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schema-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './schema-list.component.html',
  styleUrl: './schema-list.component.css',
})
export class SchemaListComponent {
  schemas: ISchema[] | undefined;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<ISchemaListReponse>('/schema/schema-definitions')
      .subscribe((res) => {
        this.schemas = res.data;
      });
  }
}
