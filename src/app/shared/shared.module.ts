import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatSidenavModule,
} from '@angular/material';

import { FormFieldComponent } from '@components/form-field/form-field.component';

@NgModule({
  declarations: [
    FormFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    FormFieldComponent,
  ]
})
export class SharedModule {}
