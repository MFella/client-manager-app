import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPrice'
})
export class ToPricePipe implements PipeTransform {

  transform(value: any): string {

    if(value === "Slow")
    {
      return "9.00";
    } else if (value === "Fast")
    {
      return "15.00";
    } else if (value === "Locker")
    {
      return "12.00";
    }
    else {
      return "";
    }

  }

}
