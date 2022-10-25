import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public base_url: string = environment.base_url;

  constructor(private http: HttpClient) { }

  crearusuario(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/usuarios`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/usuarios`, formData);
  }

}