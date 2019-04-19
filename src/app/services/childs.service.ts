import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Child } from '../Child';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildsService {

  private childsUrl = 'http://' + environment.serviceServer + '/routine/childs'; 
  constructor(private http: HttpClient) { }

  getChilds(): Observable<Child[]> {
    return this.http.get<Child[]>(this.childsUrl);
  }  
}
