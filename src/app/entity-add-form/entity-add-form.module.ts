import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityAddFormComponent } from './entity-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityOptionsPipe } from '../entity/entity-options.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AttributeFilterPipe } from '../attribute/attribute-filter.pipe';
import { EntityFormModule } from '../entity-form/entity-form.module';

@NgModule({
  declarations: [EntityAddFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EntityOptionsPipe,
    HttpClientModule,
    AttributeFilterPipe,
    FormsModule,
    EntityFormModule,
  ],
  exports: [EntityAddFormComponent],
})
export class EntityAddFormModule {}
