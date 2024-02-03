import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityLabelComponent } from './entity-label.component';
import { EntityLabelPipe } from '../entity/entity-label.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EntityLabelComponent],
  imports: [CommonModule, EntityLabelPipe, RouterModule],
  exports: [EntityLabelComponent],
})
export class EntityLabelModule {}
