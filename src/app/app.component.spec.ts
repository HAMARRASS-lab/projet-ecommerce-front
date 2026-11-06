import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserStorageService } from './services/storage/user-storage.service';
import { TEST_IMPORTS } from './testing/test-imports';

describe('AppComponent', () => {
  beforeEach(async () => {
    UserStorageService.signOut();
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the guest menu when signed out', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Login');
    expect(text).not.toContain('Logout');
    expect(text).not.toContain('demo');
  });
});
