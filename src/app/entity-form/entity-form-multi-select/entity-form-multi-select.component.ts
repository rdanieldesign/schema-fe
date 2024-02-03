import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IEntityValue } from '../../entity/entity.interface';
import { ISchemaAttribute } from '../../attribute/attribute.interface';

@Component({
  selector: 'app-entity-form-multi-select',
  templateUrl: './entity-form-multi-select.component.html',
  styleUrl: './entity-form-multi-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityFormMultiSelectComponent),
      multi: true,
    },
  ],
})
export class EntityFormMultiSelectComponent implements ControlValueAccessor {
  @Input() optionSchemaId!: string;
  @Input() optionPrimaryAttribute!: ISchemaAttribute;

  selections: IEntityValue[] = [];
  inputModel: IEntityValue | undefined;
  disabled = false;
  onChange = (value: IEntityValue[]) => {};
  onTouched = () => {};

  writeValue(value: IEntityValue[]): void {
    console.log(value);
    this.selections = value || [];
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
    if (event) {
      this.selections?.push(event);
    }
    this.onChange(this.selections);
  }
}
