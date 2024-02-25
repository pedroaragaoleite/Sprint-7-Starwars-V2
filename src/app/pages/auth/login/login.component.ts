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
      // const user: User = {
      //   user.email: this.loginForm.value.email as string,
      //   password: this.loginForm.value.password as string,
      // }
      // console.log(email, password);
      let data = this.loginForm.value;


      this.authService.login(JSON.stringify(data))
        .subscribe({
          next: (res: any) => {
            console.log(res);
            console.log(this.authService.checkEmail(res.email));

            if (res.password === data.password) {

              this.router.navigate(['/starships'])
            } else {
              console.log("no email");

            }
          },
          error: error => {
            console.error('login invalido', error);

          }
        })
    }

  }

}
