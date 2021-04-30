import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }


  getBackendData(data:any){
    let body = JSON.stringify(data);
    return this.http.post('/securities', body, httpOptions);
  }
}
