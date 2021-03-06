import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CustomerService } from '../_services/customer.service';
import { Client } from '../_models/client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  @ViewChild('editForm', {static: true}) editForm: NgForm;
  client: Client;
  constructor(public authServ: AuthService, private route: ActivatedRoute, 
      public alertify: AlertifyService, public custServ: CustomerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.client = data['client'];
    });
    this.authServ.assignCurrClient(this.client);
    console.log(this.authServ.currClient);
  }

  updateCustomer()
  {
    this.authServ.assignCurrClient(this.client);
    this.custServ.updateCustomer(this.authServ.decToken.nameid, this.client)
      .subscribe(() => {
        this.authServ.currClient = this.client;
        this.alertify.success("Profile updated successfully!");
      }, err => {
        this.alertify.error(err);
      });

  }

}
