import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IEntityValue } from '../../entity/entity.interface';

@Component({
  selector: 'app-entity-form-text-input',
  templateUrl: './entity-form-text-input.component.html',
  styleUrl: './entity-form-text-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityFormTextInputComponent),
      multi: true,
    },
  ],
})
export class EntityFormTextInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' = 'text';
  text = '';
  disabled = false;
  onChange = (value: IEntityValue[]) => {};
  onTouched = () => {};

  writeValue(value: IEntityValue[]): void {
    this.text = value?.[0]?.value || '';
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

  onTextChange(event: KeyboardEvent) {
    this.onChange([{ value: (event.target as HTMLInputElement).value }]);
  }
}
