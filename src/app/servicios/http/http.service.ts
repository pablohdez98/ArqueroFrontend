import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url): Observable<any> {
    return this.http.get<any>(API_URL + url);
  }

  public post(url, parametros): Observable<any> {
    return this.http.post<any>(API_URL + url, parametros);
  }
  public put(url, parametros): Observable<any> {
    return this.http.put<any>(API_URL + url, parametros);
  }

  public delete(url): Observable<any> {
    return this.http.delete<any>(API_URL + url);
  }
}
