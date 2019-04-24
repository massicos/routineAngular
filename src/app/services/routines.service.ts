import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Log } from '../Log';
import { Step } from '../Step';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  private logUrl = 'http://' + environment.serviceServer + '/routine/log/'; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  stepComplete(log: Log): Observable<Log> {
/*   
    return this.http.post<Log>(this.logUrl + "stepComplete", log, this.httpOptions)
    .pipe(
      catchError(this.handleError("Erreur"))
    );
  */  
   return this.http.post<Log>(this.logUrl + "stepComplete", log, this.httpOptions);
  }

  routineComplete(log: Log): Observable<Log> {
    return this.http.post<Log>(this.logUrl + "routineComplete", log, this.httpOptions);
  }

  handleError(str: String) {
    return throwError(str);
  }
}
