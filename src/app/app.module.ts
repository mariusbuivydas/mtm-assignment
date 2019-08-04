import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    RoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
