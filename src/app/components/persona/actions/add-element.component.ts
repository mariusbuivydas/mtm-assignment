import { Component, OnInit } from '@angular/core';

import { PersonaFieldType } from '@app/data/persona';
import { PersonaElementDataService } from '@services/persona-element.service';
import { FieldFactoryData } from '../fields/persona-field.factory.service';
import { PersonaElement } from '@data/persona-element';
import { PersonaFieldFactoryService } from '@components/persona/fields/persona-field.factory.service';
import { PersonaFieldService } from '@components/persona/fields/persona-field.service';

@Component({
  selector: 'app-persona-add-element',
  styleUrls: ['./add-element.component.scss'],
  templateUrl: './add-element.component.html',
  host: {
    class: 'action'
  }
})
export class PersonaAddElementComponent implements OnInit {
  elements: PersonaElement[] = [];
  fields: FieldFactoryData[] = [];
  dropListIds: string[] = [];

  constructor(
    private elementService: PersonaElementDataService,
    private fieldService: PersonaFieldService,
    private fieldFactoryService: PersonaFieldFactoryService,
  ) {}

  addField(type: PersonaFieldType) {
    this.fields.push(
      this.fieldFactoryService.appendEntryData(type)
    );
  }

  ngOnInit() {
    this.elementService.getElements().subscribe(elements => {
      this.elements = elements;

      /** Create entry data for each field type */
      this.elements.map((element: PersonaElement) => this.addField(element.field_type));
    });

    /** Reference drag and drop location */
    this.dropListIds = this.fieldService.getDropListIds();

    /** Re-push entry data every time new field is created */
    this.fieldService.onCreate().subscribe(type => this.addField(type));
  }
}
