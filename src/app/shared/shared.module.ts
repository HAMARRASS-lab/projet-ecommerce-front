import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { ProductFiltersComponent } from './product-filters/product-filters.component';

@NgModule({
  declarations: [ProductFiltersComponent],
  imports: [CommonModule, ReactiveFormsModule, DemoAngularMaterialModule],
  exports: [ProductFiltersComponent]
})
export class SharedModule { }
