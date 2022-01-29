import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../shared/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EmService {

  constructor(private http: HttpClient) { }

  getAllEventList() {
    // let upOnEvents = AppConstants.eventStatus.filter(d=>d.name == 'Ongoing' || d.name == 'Upcoming');
    // let upOnEventsKey = upOnEvents.map(d => d.key)
    return this.http.get<any>(`${environment.apiUrl}/events/getAllUpcomingOngoingEvents`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllPastEvents() {
    let pastEventStatus = AppConstants.eventStatus.filter(d=>d.name == 'Past')[0].key
    return this.http.get<any>(`${environment.apiUrl}/events/getAll?status=`+pastEventStatus).pipe(
      map(response => {
        return response;
      })
    );
  }

  getEventDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/events/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createEvent(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/events/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCountryList() {
    const headers = new HttpHeaders({'X-CSCAPI-KEY':'RFpMQmk2T05ZWGZSTmZmVEp6MGdxcFBES29HQnV1SGZQYXpKVzdCbA=='});

    return this.http.get<any>("https://api.countrystatecity.in/v1/countries", { headers: headers}).pipe(
      map(response => {
        return response;
      })
    )
  }

  getStateListByCountry(country: any) {
    const headers = new HttpHeaders({'X-CSCAPI-KEY':'RFpMQmk2T05ZWGZSTmZmVEp6MGdxcFBES29HQnV1SGZQYXpKVzdCbA=='});

    return this.http.get<any>(`https://api.countrystatecity.in/v1/countries/${country.iso2}/states`, { headers: headers}).pipe(
      map(response => {
        return response;
      })
    )
  }

  editEventDetails(id: number, data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/events/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteById(id: number): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/events/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadEventImages(files: any) {
    var formData = new FormData();
    // formData.append("files", files);
    // let fileArray = []
    for  (var i =  0; i <  files.length; i++)  {  
      formData.append("files",  files[i]);
    } 
    return this.http.post<any>(`${environment.apiUrl}/media/uploadMultipleImages?process=EVENTS`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }
}
