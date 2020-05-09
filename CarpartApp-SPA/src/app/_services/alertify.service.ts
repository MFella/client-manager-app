import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  confirm(mess: string, okCall: () => any) {
    alertify.confirm(mess, (e: any) => {
      if (e) {
        okCall();
      } else {}
    });
  }


  success(mess: string) 
  {
    alertify.success(mess);
  }
  error(mess: string) 
  {
    alertify.error(mess);
  }

  warning(mess: string) 
  {
    alertify.warning(mess);
  }
  message(mess: string) 
  {
    alertify.message(mess);
  }



}
