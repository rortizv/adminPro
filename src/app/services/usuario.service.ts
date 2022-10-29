import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public base_url: string = environment.base_url;
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        // Hay que instanciar a Usuario para que pueda tomar sus métodos
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      map(resp => true),
      // Atrapamos el error que sucede arriba y retorna un nuevo observable con false
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

}