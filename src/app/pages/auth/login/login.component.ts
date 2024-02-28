import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { emailValidator } from '../../../validators/customValidator';


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
    email: ['', [Validators.required, Validators.email, emailValidator()]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  })


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.isSubmitted = true;


    if (this.loginForm.valid) {
      let data = {...this.loginForm.value};

      this.authService.checkEmail(data.email as string)
      .subscribe(emailExists => {
        if(emailExists) {
      this.authService.login(data)
        .subscribe({
          next: (res: any) => {

            if (res.accessToken) {
              localStorage.setItem('currentUser', JSON.stringify(data));
              localStorage.setItem('userToken', res.accessToken);
              this.router.navigate(['/starships']);
            } else {
              console.error('Error en el login: No se recibió el token.');
            }
          },
          error: error => {
            console.error('Login inválido', error);
          }
        });
        } else {
          console.log("Account or password invalid");
          
        }
      });
    } else {
      console.log("Formulario no válido");
    }
  }
}
