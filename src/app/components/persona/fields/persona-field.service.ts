import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PersonaField, PersonaFieldType } from '@data/persona';
import { PersonaDataService } from '@services/persona.service';
import { FieldFactoryData } from './persona-field.factory.service';

@Injectable()
export class PersonaFieldService {
  /** Used to reference field dropzones */
  private dropListIds: string[] = [];

  /** Used to create new field */
  private type = new Subject<PersonaFieldType>();

  constructor(
    private personaDataService: PersonaDataService,
  ) {}

  getDropListIds(): string[] {
    return this.dropListIds;
  }

  addDropListId(id: string) {
    this.dropListIds.push(id);
  }

  getByColumnId(id: number, fields: PersonaField[]): PersonaField[] {
    return fields.filter(field => id == field.column_id);
  }

  update(field: PersonaField) {
    this.personaDataService.updateField(field)
      .subscribe(field => console.log('PUT', field));
  }

  delete(id: number) {
    this.personaDataService.deleteField(id)
    .subscribe(() => {
      console.log('DELETE', id);
    });
  }

  create(field: PersonaField) {
    this.personaDataService.createField(field).subscribe(field => console.log('POST', field));
  }

  onCreate() {
    return this.type.asObservable();
  }

  /** Patch form values and trigger api call */
  updateValues(
    prev: FieldFactoryData,
    current: FieldFactoryData,
    next: FieldFactoryData,
    id: string,
    newElement: boolean = false
  ) {
    const getId = (field: FieldFactoryData) => field ? field.data.id : null;
    current.form.patchValue({ prev_id: getId(prev), next_id: getId(next), column_id: id });

    if (newElement) {
      this.personaDataService.createField(current.form.value)
      .subscribe(field => {
        current.data.id = field.id;
        current.form.patchValue(field);
        this.type.next(field.field_type);
      });
    } else {
      this.update(current.form.value);
    }
  }
}
