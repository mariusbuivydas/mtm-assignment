import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PersonaModule } from '@components/persona/persona.module';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    PersonaModule,
    BrowserModule,
    RoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
