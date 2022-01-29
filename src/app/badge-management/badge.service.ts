import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private http: HttpClient) { }

  uploadBadgeIcon(file: any) {
    var formData = new FormData();
    formData.append("file", file);
    // let fileArray = []
    // for  (var i =  0; i <  files.length; i++)  {  
    //   formData.append("file",  files[i]);
    // } 
    return this.http.post<any>(`${environment.apiUrl}/media?process=BADGE_ICON`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }
  uploadCompanyLogo(file: any) {
    var formData = new FormData();
    formData.append("file", file);
    // let fileArray = []
    // for  (var i =  0; i <  files.length; i++)  {  
    //   formData.append("file",  files[i]);
    // } 
    return this.http.post<any>(`${environment.apiUrl}/media?process=SPONSOR_COMPANY_LOGO`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }

  getEventList() {
    let selectField = ['id', 'name']
    return this.http.get<any>(`${environment.apiUrl}/events/getAll?status=1&selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllBadgeList() {
    return this.http.get<any>(`${environment.apiUrl}/badges/getAll`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteById(id: number): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/badges/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createBadge(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/badges/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }


  updateBadge(data: any, id: number): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/badges/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBadgeDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/badges/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}



