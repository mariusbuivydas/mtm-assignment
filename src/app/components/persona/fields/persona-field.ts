import { FormGroup } from '@angular/forms';
import { PersonaField } from '@data/persona';

export abstract class PersonaFieldBase {
  field: PersonaField;
  form: FormGroup;

  destroy: Function = () => null;

  /* Used to set field data via field factory */
  setField(field: PersonaField) {
    this.field = field;

    return this;
  }

  setForm(form: FormGroup) {
    this.form = form;

    return this;
  }

  registerDestroy(fn: (value: any) => void) {
    this.destroy = fn;

    return this;
  }
}
