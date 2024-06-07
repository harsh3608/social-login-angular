import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseServerUrl:string='https://localhost:7001/api';

  constructor(
    private http: HttpClient
  ) { }

  apiLogin():Observable<any> {
    return this.http.get<any>(this.baseServerUrl + `/Auth/login`,);
  }
}
