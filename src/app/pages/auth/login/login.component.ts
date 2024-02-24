import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      console.log(email, password);

      this.authService.userToken.subscribe({
        next: (res: any) => {
          localStorage.setItem('userToken', JSON.stringify(res));
        }
      })


      this.authService.login(email as string, password as string)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['/starships'])
          },
          error: error => {
            console.error('login invalido', error);

          }
        })
    }

  }

}
