import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { confirmDelete } from './confirm-dialog.component';

describe('confirmDelete', () => {
  let overlay: HTMLElement;
  let emitted: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: TEST_IMPORTS });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
    emitted = false;
    confirmDelete(TestBed.inject(MatDialog), 'Delete coupon SALE?').subscribe(() => emitted = true);
  });

  const click = (label: string) => {
    flush();
    TestBed.inject(ApplicationRef).tick();
    expect(overlay.textContent).toContain('Delete coupon SALE?');
    const buttons = Array.from(overlay.querySelectorAll('button'));
    buttons.find(button => button.textContent.trim() === label).click();
    flush();
  };

  it('emits when the user confirms', fakeAsync(() => {
    click('Delete');
    expect(emitted).toBe(true);
  }));

  it('stays silent when the user cancels', fakeAsync(() => {
    click('Cancel');
    expect(emitted).toBe(false);
  }));
});
