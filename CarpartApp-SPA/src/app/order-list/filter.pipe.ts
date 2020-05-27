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
        return orders.filter(order => order.id.toString().toLowerCase()
        .indexOf(searchWhat.toLowerCase()) !== -1).sort((a,b) =>{ return b.total-a.total;});
        break;
      case "2":
        return orders.filter(order => order.clientId.toString().toLowerCase()
        .indexOf(searchWhat.toLowerCase()) !== -1).sort((a,b) =>{ return b.total-a.total;});
        break;
      case "3":
        return orders.filter(order => order.status.toLowerCase()
        .indexOf(searchWhat.toLowerCase()) !== -1).sort((a,b) =>{ return b.total-a.total;});
        break;
      case "4":
        return orders.filter(order => order.total > parseInt(searchWhat)).sort((a,b) =>{ return a.total-b.total;});
        break;
      case "5":
        return orders.filter(order => order.total < parseInt(searchWhat)).sort((a,b) =>{ return b.total-a.total;});
        break;
      default:
        return orders.filter(order => order.status.toLowerCase().indexOf(searchWhat.toLowerCase()) !== -1);
        break;
    }


  }

}
