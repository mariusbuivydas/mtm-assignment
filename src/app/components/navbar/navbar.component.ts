import { Component, OnInit } from '@angular/core';
import { PersonaService } from '@components/persona/persona.service';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  name: string;

  constructor(
    private personService: PersonaService,
  ) {}

  ngOnInit() {
    this.personService.onNameChange()
    .subscribe(name => this.name = name);
  }
}
