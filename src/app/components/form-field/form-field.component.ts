import { Component, OnInit, forwardRef, Input, ViewEncapsulation, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Register component as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
const FORM_FIELD_VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormFieldComponent),
  multi: true
};

@Component({
  selector: 'app-form-field',
  providers: [FORM_FIELD_VALUE_ACCESOR],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    class: 'form-field'
  },
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() title: string;
  @Input() value: string;
  @Input() maxlength: number;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  onInput(event) {
    event.stopPropagation();
    const input = event.target as HTMLTextAreaElement;

    this.writeValue(input.value);
    this.onChange(input.value);
    this.onTouched();
  }

  /**
   * Writes a new value to the element
   * Part of ControlValueAccessor
  */
  writeValue(value: string = '') {
    this.value = value;
  }

  /**
   * Registers a callback function
   * Part of ControlValueAccessor
  */
  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  /**
   * Registers a callback function
   * Part of ControlValueAccessor
  */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
