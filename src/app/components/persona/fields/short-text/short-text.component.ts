import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PersonaFieldBase } from '../persona-field';
import { PersonaDataService } from '@services/persona.service';
import { PersonaFieldService } from '../persona-field.service';
import { PersonaField } from '@app/data/persona';

export const SHORT_TEXT_DEFAULTS: PersonaField = {
  id: null,
  title: 'Text field',
  field_type: 'short_text',
  data: '',
  column_id: null,
  prev_id: null,
  next_id: null
};

@Component({
  styleUrls: ['./short-text.component.scss'],
  templateUrl: './short-text.component.html',
  host: {
    class: 'field'
  },
  encapsulation: ViewEncapsulation.None,
})
export class ShortTextComponent extends PersonaFieldBase implements OnDestroy {
  constructor(
    private personaDataService: PersonaDataService,
    private fieldService: PersonaFieldService,
    private fb: FormBuilder,
  ) { super(); }

  updateField() {
    this.fieldService.update(this.form.value);
  }

  deleteField() {
    this.fieldService.delete(this.field.id);
    this.destroy();
  }

  onBlur() {
    this.updateField();
  }

  ngOnDestroy() {

  }
}
