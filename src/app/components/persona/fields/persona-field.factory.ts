import {
  Component,
  Input,
  ViewContainerRef,
  ComponentRef,
  ViewChild,
  AfterContentInit,
  ComponentFactory,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PersonaField } from '@data/persona';
import { PersonaFieldBase } from './persona-field';
import { PersonaFieldFactoryService } from './persona-field.factory.service';

@Component({
  selector: 'app-persona-field-factory',
  template: `
    <ng-container #entry></ng-container>

    <ng-template #projection>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class PersonaFieldFactoryComponent implements AfterContentInit {
  private component: ComponentRef<any>;

  @Input() field: PersonaField;
  @Input() form: FormGroup;
  @Input() componentFactory: ComponentFactory<any>;

  /** used to emit destroyed field data */
  @Output() destroyed: EventEmitter<PersonaField> = new EventEmitter<PersonaField>();

  /** Get entry container reference for component injection */
  @ViewChild('entry', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  /** Get template reference for dynamic content projection */
  @ViewChild('projection', { static: true }) projection: TemplateRef<any>;

  constructor(
    private factoryService: PersonaFieldFactoryService,
  ) {}

  /**
   * Manually creates and injects component into entry container
   * @param field persona field
   */
  createComponent(field: PersonaField) {
    // creates view for projected content
    const viewRef = this.projection.createEmbeddedView({});
    this.component = this.entry.createComponent(this.componentFactory, 0, null, [viewRef.rootNodes]);

    (this.component.instance as PersonaFieldBase)
      .setField(this.field)
      .setForm(this.form)
      .registerDestroy(this.destroyComponent.bind(this));
  }

  destroyComponent() {
    this.component.destroy();
    this.destroyed.emit(this.form.value);
  }

  ngAfterContentInit() {
    this.createComponent(this.field);
  }
}
