import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  apiurl = 'http://localhost:3000/customer';

  getCustomerbyId(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  getAllCustomer() {
    return this.http.get(this.apiurl);
  }

  addCustomer(inputdata: any) {
    return this.http.post(this.apiurl + '/', inputdata);
  }
  updateCustomer(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }
  deleteCustomer(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }
}
