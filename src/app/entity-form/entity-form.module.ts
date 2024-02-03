import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityFormTextInputComponent } from './entity-form-text-input/entity-form-text-input.component';
import { FormsModule } from '@angular/forms';
import { EntityOptionsPipe } from '../entity/entity-options.pipe';
import { EntityFormSelectComponent } from './entity-form-select/entity-form-select.component';
import { EntityFormMultiSelectComponent } from './entity-form-multi-select/entity-form-multi-select.component';

@NgModule({
  declarations: [
    EntityFormTextInputComponent,
    EntityFormSelectComponent,
    EntityFormMultiSelectComponent,
  ],
  imports: [CommonModule, FormsModule, EntityOptionsPipe],
  exports: [
    EntityFormTextInputComponent,
    EntityFormSelectComponent,
    EntityFormMultiSelectComponent,
  ],
})
export class EntityFormModule {}
