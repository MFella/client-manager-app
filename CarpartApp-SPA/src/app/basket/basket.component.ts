import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  deliverValue: any;
  constructor() { }

  ngOnInit() {
  }

status()
{
  console.log(this.deliverValue);
}

}
