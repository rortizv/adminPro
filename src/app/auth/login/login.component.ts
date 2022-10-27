import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public formSubmitted = false;
  public auth2: any;

  public loginForm = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    remember: new FormControl(false)
  });

  constructor(private router: Router,
              private ngZone: NgZone,
              private usuarioService: UsuarioService) { }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      const data: LoginForm = {
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value,
        remember: this.loginForm.get('remember')!.value
      };
      this.usuarioService.login(data).subscribe(resp => {
        if (data.remember) {
          localStorage.setItem('email', data.email as string);
        } else {
          localStorage.removeItem('email');
        }
        // Navegate to dashboard if auth is OK
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      });
    }
  }

}
