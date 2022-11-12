import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public base_url: string = environment.base_url;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  constructor(private http: HttpClient) { }

  cargarHospitales() {
    const url = `${this.base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: any) => resp.hospitales)
      );
  }

}