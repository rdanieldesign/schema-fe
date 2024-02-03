import { Component, Input, SimpleChanges } from '@angular/core';
import { ISchemaAttribute } from '../attribute/attribute.interface';
import { IEntityValue } from '../entity/entity.interface';
import { EntityLabelService } from '../entity/entity-label.service';

@Component({
  selector: 'app-entity-label',
  templateUrl: './entity-label.component.html',
  styleUrl: './entity-label.component.css',
})
export class EntityLabelComponent {
  @Input() attribute!: ISchemaAttribute;
  @Input() values: IEntityValue[] | undefined = [];
  @Input() routePrefix: string = '';

  displaySegments: Array<{ label: string; id?: string }> = [];

  constructor(private entityLabelService: EntityLabelService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['values']) {
      this.displaySegments = this.entityLabelService.getLabelIdSegments(
        this.values,
        this.attribute
      );
    }
  }
}
