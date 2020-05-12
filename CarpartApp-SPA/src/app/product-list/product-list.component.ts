import { Component, OnInit, Injectable } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Product } from '../_models/product';
import { PagedRes, Pagination } from '../_models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pageNo = 2;
  pageSize = 7;
  pag: Pagination;
  toSearch: string;
  orderBy: string;

  constructor(private custServ: CustomerService, private route: ActivatedRoute,
      private alertify: AlertifyService, private router: Router, public authServ: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data.products.res;
      this.pag = data.products.pagination;
    });

  }

  pageChanged(event: any): void {
    this.pag.currPage = event.page;
    this.loadProducts();
  }

  loadProducts(){
    console.log(this.orderBy);
   // console.log(this.toSearch);
    this.custServ.getProducts(this.pag.currPage, this.pag.itemsOnPage, this.toSearch, this.orderBy)
      .subscribe((res: PagedRes<Product[]>) => {
       // console.log(res);
        this.products = res.res;
        this.pag = res.pagination;
      }, err => {
        this.alertify.error(err);
      })
  }

  toProductDetail(id: any)
  {
    this.custServ.productSubj.next(this.products[id]);
  }



}
