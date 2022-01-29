import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MmService {

  constructor(private http: HttpClient) { }

  getAreaList(id?:number): Observable<any> {
    let url = id == 1 ? "assets/json/countries.json": id == 2 ?  "assets/json/states.json": "assets/json/cities.json";
    
    return this.http.get<any>(url).pipe(
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

  getCityListByState(state: any, country: any) {
    const headers = new HttpHeaders({'X-CSCAPI-KEY':'RFpMQmk2T05ZWGZSTmZmVEp6MGdxcFBES29HQnV1SGZQYXpKVzdCbA=='});

    return this.http.get<any>(`https://api.countrystatecity.in/v1/countries/${country.iso2}/states/${state.iso2}/cities`, { headers: headers}).pipe(
      map(response => {
        return response;
      })
    )
  }


  getAllMemberList() {
    return this.http.get<any>(`${environment.apiUrl}/auth/allMembers`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMemberDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/accounts/getDetailsById?id=${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createMember(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  editMemberDetails(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/accounts/adminUpdateMasterDetails`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteUser(data: any): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/accounts/deleteMember`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadFile(file: File) {
    var formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${environment.apiUrl}/media/uploadPhoto?process=PROFILE_PIC`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }
}
