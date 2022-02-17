import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getAllMailContentList(): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/settings/getAllMailContent`,).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateMailContent(data: any, id: number): Observable<any> {
    
    return this.http.post<any>(`${environment.apiUrl}/settings/updateMailContent/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMailContentDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/settings/getMailContent/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllTaxes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/settings/getAllTaxes`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getTaxDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/settings/getTaxDetails/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  

  getAccountDetails() {
    return this.http.get<any>(`${environment.apiUrl}/accounts/details`).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateAccountDetails(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/accounts/changePassword`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTaxDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/settings/updateTaxDetails/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createTax(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/settings/createTax`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/settings/deleteTax/${id}`).pipe(
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

  getAllCoupons(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/coupons/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCouponDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/coupons/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateCouponDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/coupons/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createCoupon(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/coupons/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateHideShowSettings(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/configurations/updateHideShowSettings`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCouponById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/coupons/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getHideShowSettings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/configurations/hideShowSettings`).pipe(
      map(response => {
        return response;
      })
    );
  }

}
