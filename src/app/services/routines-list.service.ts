import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Routine } from '../routine';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutinesListService {

  private routinesListUrl = 'http://' + environment.serviceServer + '/routine/routines-list'; 
  constructor(private http: HttpClient) { }

  getRoutinesList(): Observable<Routine[]> {
    return this.http.get<Routine[]>(this.routinesListUrl);
  }  
}
