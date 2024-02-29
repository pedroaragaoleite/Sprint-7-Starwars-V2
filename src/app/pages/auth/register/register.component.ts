import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { emailValidator } from '../../../validators/customValidator';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  isSubmitted: boolean = false;
  notMatch: boolean = false;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email, emailValidator()]]
  })


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      const user: User = {
        firstName: this.registerForm.value.firstName as string,
        lastName: this.registerForm.value.lastName as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string
      };

      console.log(this.registerForm.value.password2);

      if (user.password === this.registerForm.value.password2) {
        this.authService.checkEmail(user.email as string)
          .subscribe(emailExists => {
            if (!emailExists) {
              this.authService.register(user)
                .subscribe({
                  next: (response: any) => {
                    if (response.accessToken) {
                      localStorage.setItem('currentUser', JSON.stringify(response));
                      localStorage.setItem('userToken', response.accessToken as string);
                      this.router.navigate(['/login']);
                    }
                  },
                  error: error => {
                    console.error('Error durante el registro')
                  }
                })
            } else {
              console.error('El email ya esta registrado');
              this.router.navigate(['/login'])
              console.log(this.registerForm.value.password);
              console.log(this.registerForm.value.password2);
            }
          })
      } else {
        console.log("Las contraseñas no son identicas");
        this.notMatch = true;

      }
    }
  }
}
