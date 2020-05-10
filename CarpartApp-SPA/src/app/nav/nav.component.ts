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

  constructor(private authServ: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }


  login()
  {
    this.authServ.login(this.creds)
      .subscribe(res => {
        this.alertify.success('Logged in successfully');
        console.log(res);
      }, err => {
        this.alertify.error(`Something went wrong: ${err}`);
      })
  }
  
  loggedIn() {
    return this.authServ.loggedIn();
  }
  
  logout()
  {
    this.creds = {};
    localStorage.removeItem('token');
    this.router.navigate(['/products']);
    this.alertify.success('Logged out successfully');
  }

}
