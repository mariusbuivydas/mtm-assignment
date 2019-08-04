import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PersonaService {
  private name = new Subject<string>();

  updateName(name: string) {
    this.name.next(name);
  }

  onNameChange() {
    return this.name.asObservable();
  }
}
