import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiErrorMessage } from 'src/app/shared/api-error';
import { confirmDelete } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  readonly columns = ['name', 'description', 'actions'];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.adminService.getAllCategories().subscribe(res => this.categories = res);
  }

  deleteCategory(category: any): void {
    confirmDelete(this.dialog, `Delete category ${category.name}?`).subscribe(() => {
      this.adminService.deleteCategory(category.id).subscribe(() => {
        this.snackBar.open('Category deleted successfully', 'Close', { duration: 5000 });
        this.getCategories();
      }, error => {
        this.snackBar.open(apiErrorMessage(error, 'Could not delete this category'), 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      });
    });
  }
}
