import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { PersonaElementData, PersonaElement } from '@data/persona-element';

@Injectable()
export class PersonaElementDataService implements PersonaElementData {
  private elements: PersonaElement[] = [
    { title: 'Short text', body: 'Abc', field_type: 'short_text' },
  ];

  getElements() {
    return of(this.elements);
  }
}
