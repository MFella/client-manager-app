import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../_models/client';
import { ToPricePipe } from './toPrice.pipe';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  deliverValue: any;
  client: Client;
  delVal: any;
  constructor(public authServ: AuthService, private route: ActivatedRoute,
    private toPrice: ToPricePipe) { }

  ngOnInit() {
    this.route.data.subscribe((resp) => 
      {
        this.client = resp.client;
      });
  }

  status()
  {
    this.delVal = this.toPrice.transform(this.deliverValue);
    //console.log(this.toPrice.transform(this.deliverValue));
  }

  isFullDetailed()
  {
    
    if(this.client.city.length < 2 || this.client.country.length < 2 || 
        this.client.postcode.length < 2 || this.client.street.length < 2)
        {
          return false;
        }
    return true;
  }


}
