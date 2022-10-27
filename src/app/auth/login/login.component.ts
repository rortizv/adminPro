import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;
  public auth2: any;

  public loginForm = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    remember: new FormControl(false)
  });

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }
  
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "246426062891-n7ev7354t4hbre8e38i95as2hcujgomg.apps.googleusercontent.com",
      callback: response => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(
      resp => {
        this.router.navigateByUrl('/')
      }
    )
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      const data: LoginForm = {
        email:    this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value,
        remember: this.loginForm.get('remember')!.value
      };
      this.usuarioService.login(data).subscribe(resp => {
        if (data.remember) {
          localStorage.setItem('email', data.email as string);
        } else {
          localStorage.removeItem('email');
        }
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      });
    }
  }
}
