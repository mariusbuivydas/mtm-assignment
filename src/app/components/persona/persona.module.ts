import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '@app/shared/shared.module';

import { PersonaComponent } from './persona.component';
import { PersonaAddElementComponent } from './actions/add-element.component';
import { PersonaFieldFactoryComponent } from './fields/persona-field.factory';
import { PersonaToolbarComponent } from './toolbar/persona-toolbar';
import { ShortTextComponent } from './fields/short-text/short-text.component';
import { PersonaDataService } from '@services/persona.service';
import { PersonaElementDataService } from '@services/persona-element.service';
import { PersonaService } from './persona.service';
import { PersonaFieldService } from './fields/persona-field.service';
import { PersonaFieldFactoryService } from './fields/persona-field.factory.service';

const COMPONENTS = [
  PersonaComponent,
  PersonaAddElementComponent,
  PersonaFieldFactoryComponent,
  PersonaToolbarComponent,
  ShortTextComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    DragDropModule,
  ],
  providers: [
    PersonaService,
    PersonaDataService,
    PersonaFieldService,
    PersonaFieldFactoryService,
    PersonaElementDataService,
  ],
  entryComponents: [
    ShortTextComponent,
  ],
})
export class PersonaModule {}
