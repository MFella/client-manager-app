import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

order: any;
  constructor(private route: ActivatedRoute, public authServ: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((el: any) => 
    {
      this.order = el.order;
      console.log(el.order);
    });
  }

}
