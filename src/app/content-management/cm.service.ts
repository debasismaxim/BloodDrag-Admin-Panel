import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CmService {

  constructor(private http: HttpClient) { }

  getContentData() {
    return this.http.get<any>(`${environment.apiUrl}/contents/get`).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateContentDetails(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/contents/update`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

}
