import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';

import { PersonaField, PersonaFieldType } from '@data/persona';
import { ShortTextComponent, SHORT_TEXT_DEFAULTS } from './short-text/short-text.component';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FieldFactoryData {
  form: FormGroup;
  data: Partial<PersonaField>;
  factory: ComponentFactory<FieldTypes>;
}

export type FieldTypes = ShortTextComponent;

const COMPONENTS = {
  short_text: { ref: ShortTextComponent, defaults: SHORT_TEXT_DEFAULTS },
};

@Injectable()
export class PersonaFieldFactoryService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private fb: FormBuilder,
  ) {}

  /** Resolves component for given field type */
  resolveComponent(type: PersonaFieldType): ComponentFactory<FieldTypes> {
    return this.resolver.resolveComponentFactory(COMPONENTS[type].ref);
  }

  /**
   * Appends entry data for field factory component
   * Component factory is used to re-create component when moved to another column
   */
  appendEntryData(type: PersonaFieldType, data: Partial<PersonaField> = {}): FieldFactoryData {
    const field_data = { ...COMPONENTS[type].defaults, ...data };

    return {
      form: this.fb.group(field_data),
      data: field_data,
      factory: this.resolveComponent(type)
    };
  }
}
