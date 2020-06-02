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
  basketId: number;
  quant: number[];

  constructor(private custServ: CustomerService, private route: ActivatedRoute,
      private alertify: AlertifyService, private router: Router, public authServ: AuthService) { }

  ngOnInit() {
    this.quant = [1,1,1,1,1];
    this.route.data.subscribe(data => {
      console.log(data);
      this.products = data.products.res;
      console.log(this.products[0].id);
      //for(let i = 0; i < this.products.length; i++) this.quant.push(1);
      this.pag = data.products.pagination;
      if(this.authServ.loggedIn())
      {
        this.basketId = data.basket.id;
      }
    });
  }

  trackByItems(index: number, item: Product): number { return index; }

  pageChanged(event: any): void {
    this.pag.currPage = event.page;
    this.loadProducts();
  }

  loadProducts(){
    console.log(this.orderBy);
   // console.log(this.toSearch);
    this.custServ.getProducts(this.pag.currPage, this.pag.itemsOnPage, this.toSearch, this.orderBy)
      .subscribe((res: PagedRes<Product[]>) => {
        console.log(res);
        this.products = res.res;
        this.pag = res.pagination;
      }, err => {
        this.alertify.error(err);
      })
  }

  // toProductDetail(id: any)
  // {
  //   //this.custServ.productSubj.next(this.products[id]);
  // }

  addToBasket(prodId: number, index: number)
  {
    console.log(this.quant);
    console.log(index);
    let apprQuant = this.quant[index];
    let toBasket = {
      OrderId: this.basketId,
      ProductId: prodId,
      Quantity: apprQuant
    }
    this.custServ.addItemToOrder(this.authServ.decToken.nameid, prodId, [toBasket])
      .subscribe(() => {
        this.alertify.success("The item has been added to basket!");
      }, err => {
        this.alertify.error("Item is already in your basket!");
      });

      this.quant = [1,1,1,1,1];
   }

   deleteItem(productId: number, index: number)
   {
     this.alertify.confirm(`Are you sure you want delete ${this.products[index].name}?`, () => 
     {
      this.custServ.deleteProduct(productId, this.authServ.decToken.nameid)
      .subscribe(el =>
        {
          this.products.splice(this.products.findIndex(p => p.id === productId), 1);
          this.alertify.success(`Item has been removed!`);
        }, err =>
        {
          this.alertify.error(`Cant remove item. Try do this later`);
        });
     })

   }

}
