import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-schema-add',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './schema-add.component.html',
  styleUrl: './schema-add.component.css',
})
export class SchemaAddComponent {
  name = new FormControl('');

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http
      .post<string>(`/schema/schema-definitions`, {
        name: this.name.value,
      })
      .subscribe((res) => {
        this.router.navigate(['/schemas']);
      });
  }
}
