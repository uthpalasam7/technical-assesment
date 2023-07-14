import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiurl = 'http://localhost:3000/user';

  getUserbyId(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
}
