import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class TestService {

  constructor(private http: HttpClient) { }

  configUrl = environment.baseUrl + '/securities';


  getBackendData(data:any){
    return this.http.get(this.configUrl, {params: data});
  }

}
