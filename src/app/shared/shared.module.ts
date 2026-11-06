import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';

@NgModule({
  declarations: [ProductFiltersComponent, ConfirmDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, DemoAngularMaterialModule],
  exports: [ProductFiltersComponent]
})
export class SharedModule { }
