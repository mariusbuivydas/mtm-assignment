import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from './../../environments/environment';

import {
  Persona,
  PersonaData,
  PersonaColumn,
  PersonaField,
} from '@data/persona';

/** for demo purposes */
let id_counter = 3;

const PERSONA_ID = 20;
const ENDPOINT = `${environment.api_url}/personas`;

@Injectable()
export class PersonaDataService implements PersonaData {
  constructor(private http: HttpClient) {}

  getPersona(id: number = PERSONA_ID) {
    return this.http.get<Persona>(`${ENDPOINT}/${id}`);
  }

  updatePersona(persona: Persona) {
    return of(persona);
  }

  getColumns(id: number = PERSONA_ID) {
    return this.http.get<PersonaColumn[]>(`${ENDPOINT}/${id}/columns`);
  }

  getFields(id: number = PERSONA_ID) {
    return this.http.get<PersonaField[]>(`${ENDPOINT}/${id}/fields`);
  }

  createField(field: Partial<PersonaField>) {
    field.id = ++id_counter;
    return of(field);
  }

  updateField(field: PersonaField) {
    return of(field);
  }

  deleteField(id: number) {
    return of({});
  }
}
