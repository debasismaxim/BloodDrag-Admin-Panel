import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmService {

  constructor(private http: HttpClient) { }

  createTicket(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/tickets/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllTicketList(eventId: number) {
    return this.http.get<any>(`${environment.apiUrl}/tickets/getAll?status=1&eventId=`+eventId).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteById(id: number): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/tickets/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTicketTypeById(id: number): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/tickets/tickettypes/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getEventList() {
    let selectField = ['id', 'name', 'startDate', 'endDate']
    return this.http.get<any>(`${environment.apiUrl}/events/getAll?status=1&selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getTicketTypeList() {
    let selectField = ['name', 'id']
    return this.http.get<any>(`${environment.apiUrl}/tickets/ticketTypes?selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getTicketDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/tickets/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  editTicketDetails(id: number, data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/tickets/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTicketTypes(id: number, data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/tickets/tickettypes/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createTicketTypes(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/tickets/tickettypes/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
}
