import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {

  transform(value: any, multiplier: any): any {
    return parseFloat(value) * parseFloat(multiplier);
  }

}
