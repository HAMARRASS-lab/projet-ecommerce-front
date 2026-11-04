import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductFilterCriteria } from './product-filter';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  @Input() categories: string[] = [];
  @Output() criteriaChange = new EventEmitter<ProductFilterCriteria>();

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      categoryName: [null],
      minPrice: [null],
      maxPrice: [null],
      sort: ['default'],
    });
    this.filterForm.valueChanges.subscribe(value => this.criteriaChange.emit(value));
  }

  reset(): void {
    this.filterForm.reset({ categoryName: null, minPrice: null, maxPrice: null, sort: 'default' });
  }
}
