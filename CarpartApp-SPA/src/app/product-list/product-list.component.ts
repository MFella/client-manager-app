import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Product } from '../_models/product';
import { PagedRes } from '../_models/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pageNo = 2;
  pageSize = 7;
  constructor(private custServ: CustomerService) { }

  ngOnInit() {

    this.custServ.getProducts(this.pageNo,this.pageSize).subscribe(
      (res: PagedRes<Product[]>) => {
        this.products = res.res;
      }
    )
  }

}
