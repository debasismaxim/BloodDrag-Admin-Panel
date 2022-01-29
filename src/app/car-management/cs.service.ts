import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsService {

  constructor(private http: HttpClient) { }


  getAllMake(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/makes/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }
  getMakeDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/makes/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateMakeDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/makes/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createMake(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/makes/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteMakeById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/makes/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllModels(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/models/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }
  getModelDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/models/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateModelDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/models/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createModel(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/models/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteModelById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/models/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
