import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  deliverValue: any;
  constructor(public authServ: AuthService) { }

  ngOnInit() {
    console.log(this.authServ.currClient);
  }

  status()
  {
    console.log(this.deliverValue);
    
    console.log(this.authServ.isFullDetailed());
  }


}
