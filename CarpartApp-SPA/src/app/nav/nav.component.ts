import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  creds: any = {};


  constructor(public authServ: AuthService, public alertify: AlertifyService,
    public router: Router) { }

  ngOnInit() {
  }


  login()
  {
    this.authServ.login(this.creds)
      .subscribe(res => {
        this.alertify.success('Logged in successfully');
        this.router.navigate(['/products']);
      }, err => {
        this.alertify.error(`Something went wrong`);
      })
  }
  
  loggedIn() {
    return this.authServ.loggedIn();
  }
  
  logout()
  {
    this.creds = {};
    this.authServ.currClient = null;
    this.authServ.decToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    this.router.navigate(['/products']);
    this.alertify.success('Logged out successfully');
  }

}
