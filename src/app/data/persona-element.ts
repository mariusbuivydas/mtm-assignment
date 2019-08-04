import { Observable } from 'rxjs';
import { PersonaFieldType } from '@data/persona';

export interface PersonaElement {
  title: string;
  body: string;
  field_type: PersonaFieldType;
}

export abstract class PersonaElementData {
  abstract getElements(): Observable<PersonaElement[]>;
}
