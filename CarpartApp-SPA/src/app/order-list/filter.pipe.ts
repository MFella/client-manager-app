import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../_models/order';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(orders: Order[], searchWhat: string, whatExactly: string): Order[] {
    
    if(!orders || !searchWhat)
    {
      return orders;
    }
    console.log(whatExactly);
    //return orders.filter(order => order.status.toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);

    switch(whatExactly)
    {
      case "1":
        return orders.filter(order => order.id.toString().toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);
        break;
      case "2":
        return orders.filter(order => order.clientId.toString().toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);
        break;
      case "3":
        return orders.filter(order => order.status.toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);
        break;
      case "4":
        return orders.filter(order => order.total > parseInt(searchWhat));
        break;
      case "5":
        return orders.filter(order => order.total < parseInt(searchWhat));
        break;
      default:
        return orders.filter(order => order.status.toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);
        break;
    }


  }

}
