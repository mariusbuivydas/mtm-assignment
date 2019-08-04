import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-toolbar',
  styleUrls: ['./persona-toolbar.scss'],
  templateUrl: './persona-toolbar.html',
})
export class PersonaToolbarComponent implements OnInit {
  @Input() name: string;

  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;

  constructor(
    private personaService: PersonaService,
  ) {}

  onInput(event) {
    this.name = event.target.textContent;
    this.personaService.updateName(this.name);
  }

  onClick() {
    this.nameInput.nativeElement.focus();
  }

  ngOnInit() {
    this.personaService.onNameChange()
    .subscribe(name => this.name = name);
   }
}
