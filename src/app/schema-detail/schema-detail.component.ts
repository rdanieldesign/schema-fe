import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ISchemaDetail } from '../schema/schema.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schema-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './schema-detail.component.html',
  styleUrl: './schema-detail.component.css',
})
export class SchemaDetailComponent {
  schema: ISchemaDetail | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get<ISchemaDetail>(
        `/schema/schema-definitions/${this.route.snapshot.paramMap.get(
          'schemaId'
        )}`
      )
      .subscribe((res) => {
        this.schema = res;
      });
  }

  addAttribute() {
    this.router.navigate(['/attributes/add'], {
      queryParams: { schemaId: this.schema?.id },
    });
  }

  associateAttribute() {
    this.router.navigate(['/attributes/associate'], {
      queryParams: { schemaId: this.schema?.id },
    });
  }
}
