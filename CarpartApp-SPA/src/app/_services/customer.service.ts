import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backUrl = environment.backUrl;

constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<Client>
  {
    return this.http.get<Client>(this.backUrl + 'clients/' + id);
  }

  updateCustomer(id: number, client: Client)
  {
    return this.http.put(this.backUrl + 'clients/' + id, client);
  }

  getProducts()
  {
    return this.http.get(this.backUrl + 'products/');
  }

}
