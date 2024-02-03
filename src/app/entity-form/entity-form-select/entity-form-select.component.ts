import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IEntityValue } from '../../entity/entity.interface';
import { ISchemaAttribute } from '../../attribute/attribute.interface';

@Component({
  selector: 'app-entity-form-select',
  templateUrl: './entity-form-select.component.html',
  styleUrl: './entity-form-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityFormSelectComponent),
      multi: true,
    },
  ],
})
export class EntityFormSelectComponent implements ControlValueAccessor {
  @Input() optionSchemaId!: string;
  @Input() optionPrimaryAttribute!: ISchemaAttribute;

  selection: IEntityValue | undefined;
  disabled = false;
  onChange = (value: IEntityValue[]) => {};
  onTouched = () => {};

  writeValue(value: IEntityValue[]): void {
    this.selection = value?.[0];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(event: any) {
    this.onChange([event]);
  }
}
