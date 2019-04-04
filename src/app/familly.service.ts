import { Injectable } from '@angular/core';
import { Familly } from './familly';
import { FAMILLY } from './mock-familly';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FamillyService {

  private famillyUrl = 'http://localhost:8181/routine/familly/Massicotte'; 
  constructor(private http: HttpClient) { }

  getFamilly(): Observable<Familly> {
    return this.http.get<Familly>(this.famillyUrl);
    //return of(FAMILLY);
  }
}
