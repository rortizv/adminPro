import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    remember: new FormControl(false)
  });

  constructor(private usuarioService: UsuarioService) { }
  
  login() {
    const data: LoginForm = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
    };
    this.usuarioService.login(data).subscribe(resp => {
        console.log(resp);
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      });
  }

}
