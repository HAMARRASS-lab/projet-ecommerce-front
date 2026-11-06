import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { AdminService } from '../../service/admin.service';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;
  let admin: jasmine.SpyObj<AdminService>;
  let dialogResult: boolean;

  beforeEach(async () => {
    admin = jasmine.createSpyObj('AdminService', ['getAllCategories', 'deleteCategory']);
    admin.getAllCategories.and.returnValue(of([{ id: 1, name: 'Shoes', description: 'All shoes' }]));
    admin.deleteCategory.and.returnValue(of(null));
    dialogResult = true;

    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [CategoriesComponent],
      providers: [
        { provide: AdminService, useValue: admin },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(dialogResult) }) } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lists the categories', () => {
    expect(fixture.nativeElement.textContent).toContain('Shoes');
  });

  it('deletes a category once confirmed, then reloads', () => {
    component.deleteCategory({ id: 1, name: 'Shoes' });
    expect(admin.deleteCategory).toHaveBeenCalledWith(1);
    expect(admin.getAllCategories).toHaveBeenCalledTimes(2);
  });

  it('does nothing when the deletion is cancelled', () => {
    dialogResult = false;
    component.deleteCategory({ id: 1, name: 'Shoes' });
    expect(admin.deleteCategory).not.toHaveBeenCalled();
  });

  it('keeps the list when the backend refuses', () => {
    admin.deleteCategory.and.returnValue(throwError({ error: 'Category has products' }));
    component.deleteCategory({ id: 1, name: 'Shoes' });
    expect(admin.getAllCategories).toHaveBeenCalledTimes(1);
  });
});
