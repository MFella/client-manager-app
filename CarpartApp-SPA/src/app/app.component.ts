import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Client } from './_models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CarpartApp-SPA';

  jwtHelper = new JwtHelperService();

  constructor(private authServ: AuthService){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const client: Client = JSON.parse(localStorage.getItem('client'));
    if(token)
    {
      this.authServ.decToken = this.jwtHelper.decodeToken(token);
    }
    if(client)
    {
      this.authServ.currClient = client;
    }
  }
}
