import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { PersonaColumn, Persona, PersonaField } from '@data/persona';
import { PersonaService } from './persona.service';
import { PersonaDataService } from '@services/persona.service';
import { PersonaFieldFactoryService, FieldFactoryData } from './fields/persona-field.factory.service';
import { PersonaFieldService } from './fields/persona-field.service';

interface Fields {
  [columnId: string]: FieldFactoryData[];
}

@Component({
  selector: 'app-persona',
  styleUrls: ['./persona.component.scss'],
  templateUrl: './persona.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PersonaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  persona: Persona;
  columns: PersonaColumn[] = [];
  fields: Fields = {};

  form: FormGroup = this.fb.group({
    id: null,
    name: ['', Validators.required],
    initials: ['', Validators.required],
    color: '',
    avatar: '',
  });

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private personaDataService: PersonaDataService,
    private factoryService: PersonaFieldFactoryService,
    private fieldService: PersonaFieldService,
  ) {}

  /* Sets entry data for each field component */
  setEntryData(fields: PersonaField[]): FieldFactoryData[] {
    return fields.map(field => this.factoryService.appendEntryData(field.field_type, field));
  }

  splitFieldsToColumns(columns: PersonaColumn[], fields: PersonaField[]) {
    columns.map(column => {
      this.fieldService.addDropListId(`${column.id}`);

      this.fields[column.id] = this.setEntryData(
        this.fieldService.getByColumnId(column.id, fields)
      );
    });
  }

  onFieldDrop(event: CdkDragDrop<FieldFactoryData[]>) {
    const newElement: boolean = event.previousContainer.id === 'persona-elements';

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.fieldService.updateValues(
      event.container.data[event.currentIndex - 1],
      event.container.data[event.currentIndex],
      event.container.data[event.currentIndex + 1],
      event.container.id,
      newElement
    );
  }

  onFieldDestroy(field: PersonaField) {
    this.fields[field.column_id] = this.fields[field.column_id].filter(value => field.id !== value.form.value.id);
  }

  subscribeToNameChange() {
    const subscription = this.personaService.onNameChange().subscribe(name => {
      /** Mark as touched due to non direct value change */
      this.form.get('initials').markAsTouched();
      this.form.get('name').markAsTouched();

      this.form.patchValue({
        name: name,
        initials: name.substring(0, 3).toUpperCase()
      });
    });

    this.subscriptions.push(subscription);
  }

  subscribeToFormChange() {
    this.form.valueChanges.subscribe((form) => {
      if (form.name !== this.persona.name) {
       this.persona.name = form.name;
       this.personaService.updateName(this.persona.name);
      }

      if (form.initials !== this.persona.initials) {
        this.persona.initials = form.initials;
        form.initials = form.initials.toUpperCase();
      }

      if (this.form.valid) {
        this.personaDataService.updatePersona(this.form.value)
        .subscribe(persona => console.log('POST', persona));
      }
    });
  }

  ngOnInit() {
    forkJoin(
      this.personaDataService.getPersona(),
      this.personaDataService.getColumns(),
      this.personaDataService.getFields()
    ).subscribe(([persona, columns, fields]) => {
      this.persona = persona;
      this.columns = columns;

      this.splitFieldsToColumns(columns, fields);
      this.form.patchValue(this.persona);
      this.personaService.updateName(this.persona.name);

      this.subscribeToFormChange();
      this.subscribeToNameChange();
    });
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
