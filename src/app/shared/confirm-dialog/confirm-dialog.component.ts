import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <p mat-dialog-content>{{message}}</p>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) { }
}

/** Asks before deleting; emits only if the user confirms. */
export function confirmDelete(dialog: MatDialog, message: string): Observable<unknown> {
  return dialog.open(ConfirmDialogComponent, { data: message }).afterClosed().pipe(filter(Boolean));
}
