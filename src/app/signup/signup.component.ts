import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) { 

    }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:[null, [Validators.required]],
      email:[null, [Validators.required,Validators.email]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;
  }

  onSubmit(): void {
    const password= this.signupForm.get('password')?.value;
    const confirmPassword= this.signupForm.get('confirmPassword')?.value;

    if(password!==confirmPassword){
      this.snackBar.open('Password do not match.', 'close', {duration: 5000, panelClass: 'error-snackbar'});
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
      
        this.snackBar.open('Sign up successful', 'Close', { duration: 5000 });
        console.log('Registration Response:', response);
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Sign up failed', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        this.router.navigateByUrl("/login");
      }
    );
    
  }

}
