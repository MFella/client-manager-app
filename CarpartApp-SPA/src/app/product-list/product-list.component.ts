import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private custServ: CustomerService) { }

  ngOnInit() {

    this.custServ.getProducts().subscribe(
      (res: Product[]) => {
        this.products = res;
        console.log(res);
      }
    )
  }

}
