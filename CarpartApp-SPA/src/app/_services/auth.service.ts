import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Client } from '../_models/client';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  decToken: any;
  currClient: Client;
  jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }

login(creds: any)
{
  return this.http.post(this.baseUrl + 'login', creds)
  .pipe(map((res: any) => {
    const client = res;
    if(client)
    {
      localStorage.setItem('token', client.token);
      localStorage.setItem('client', JSON.stringify(client.client));
      this.decToken = this.jwtHelper.decodeToken(client.token);
      this.currClient = client.client;
      console.log(res);
    }
  }));
}
  assignCurrClient(client: Client)
  {
    this.currClient = client;
  }

  register(client: Client) {
    return this.http.post(this.baseUrl + 'register', client);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isFullDetailed()
  {
    if(this.currClient.city.length < 2 || this.currClient.country.length < 2 || 
      this.currClient.postcode.length < 2 || this.currClient.street.length < 2)
      {
        return false;
      }
      return true;
  }

}
