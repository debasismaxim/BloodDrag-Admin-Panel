import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PariticipantService {

  constructor(private http: HttpClient) {}

  getAllParticipantList(eventId: number) {
    return this.http.post<any>(`${environment.apiUrl}/events/getAllParticipantRequests`, {eventId}).pipe(
      map(response => {
        return response;
      })
    );
  }

  approveRejectParticipant(eventId: number) {
    return this.http.post<any>(`${environment.apiUrl}/events/getAllParticipantRequests`, {eventId}).pipe(
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

  
}
