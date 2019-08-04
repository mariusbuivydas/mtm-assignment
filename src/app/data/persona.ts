import { Observable } from 'rxjs';

export interface Persona {
  id: number;
  name: string;
  initials: string;
  color: string;
  avatar: string;
}

export type PersonaFieldType = 'short_text' | 'long_text' | 'image' | 'number' | 'gallery';

export interface PersonaField {
  id: number;
  title: string;
  field_type: PersonaFieldType;
  data: string;
  column_id: number;
  prev_id: null | number;
  next_id: null | number;
}

export interface PersonaColumn {
  id: number;
  width: 'thin' | 'wide';
}

export abstract class PersonaData {
  abstract getPersona(id: number): Observable<Persona>;
  abstract updatePersona(persona: Persona): Observable<Persona>;
  abstract getColumns(id: number): Observable<PersonaColumn[]>;
  abstract getFields(id: number): Observable<PersonaField[]>;
  abstract createField(field: Partial<PersonaField>): Observable<Partial<PersonaField>>;
  abstract updateField(field: PersonaField): Observable<PersonaField>;
  abstract deleteField(id: number): Observable<{}>;
}
