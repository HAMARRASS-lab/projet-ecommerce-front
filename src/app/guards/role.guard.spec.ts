import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserStorageService } from '../services/storage/user-storage.service';
import { GuestGuard } from './guest.guard';
import { RoleGuard } from './role.guard';

describe('route guards', () => {
  let storage: UserStorageService;
  let router: Router;
  const adminRoute = { data: { role: 'ADMIN' } } as unknown as ActivatedRouteSnapshot;

  const signInAs = (role: string) => {
    storage.saveToken('token');
    storage.saveUser({ userId: 1, role });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule] });
    storage = TestBed.inject(UserStorageService);
    router = TestBed.inject(Router);
    UserStorageService.signOut();
  });

  afterEach(() => UserStorageService.signOut());

  it('sends anonymous visitors to the login page', () => {
    const result = TestBed.inject(RoleGuard).canActivate(adminRoute) as UrlTree;
    expect(router.serializeUrl(result)).toBe('/login');
  });

  it('lets the matching role through', () => {
    signInAs('ADMIN');
    expect(TestBed.inject(RoleGuard).canActivate(adminRoute)).toBe(true);
  });

  it('sends the wrong role to its own dashboard', () => {
    signInAs('CUSTOMER');
    const result = TestBed.inject(RoleGuard).canActivate(adminRoute) as UrlTree;
    expect(router.serializeUrl(result)).toBe('/customer/dashboard');
  });

  it('rejects a stored user with no token', () => {
    signInAs('ADMIN');
    window.localStorage.removeItem('ecom-token');
    expect(TestBed.inject(RoleGuard).canActivate(adminRoute)).not.toBe(true);
  });

  it('keeps signed-in users off the guest pages', () => {
    expect(TestBed.inject(GuestGuard).canActivate()).toBe(true);
    signInAs('CUSTOMER');
    const result = TestBed.inject(GuestGuard).canActivate() as UrlTree;
    expect(router.serializeUrl(result)).toBe('/customer/dashboard');
  });

  it('reads back the saved user with its role', () => {
    signInAs('ADMIN');
    expect(UserStorageService.getUserRole()).toBe('ADMIN');
    expect(UserStorageService.getUserId() as unknown).toBe(1);
  });
});
