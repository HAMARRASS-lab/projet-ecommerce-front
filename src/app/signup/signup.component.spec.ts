import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stays on the page when sign up fails, so the user can correct it', () => {
    const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl');
    component.signupForm.setValue({ name: 'A', email: 'a@b.co', password: 'p', confirmPassword: 'p' });
    component.onSubmit();
    TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('sign-up'))
      .flush('Email already used', { status: 409, statusText: 'Conflict' });
    expect(navigate).not.toHaveBeenCalled();
  });
});
