import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllSocialMediaList() {
    return this.http.get<any>(`${environment.apiUrl}/homepages/getAllSocialMedia`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllHomeSlideList() {
    return this.http.get<any>(`${environment.apiUrl}/configurations/slide/listAdmin`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createSlideContent(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/configurations/slide/create`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateSlideContent(payLoad: any, socialMediaId:number) {
    return this.http.post<any>(`${environment.apiUrl}/configurations/slide/update/${socialMediaId}`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }


  deleteSlideContent(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/configurations/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateSocialMedia(payLoad: any, socialMediaId:number) {
    return this.http.post<any>(`${environment.apiUrl}/homepages/updateSocialMedia/${socialMediaId}`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  createSocialMedia(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/homepages/createSocialMedia`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  delteSocialMedia(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/homepages/deleteSocialMedia/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllHomeGridList() {
    return this.http.get<any>(`${environment.apiUrl}/homepages/getAllHomeGrids`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getHomeBanner() {
    return this.http.get<any>(`${environment.apiUrl}/configurations/getBanner`).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveHomeBanner(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/configurations/saveBanner`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }


  getStripe() {
    return this.http.get<any>(`${environment.apiUrl}/configurations/getStripe`).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStripe(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/configurations/saveStripe`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }


  getSEOData(type:any) {
    return this.http.get<any>(`${environment.apiUrl}/configurations/getSEO/${type}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveSEOData(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/configurations/saveSEO`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateHomeGrid(payLoad: any, socialMediaId:number) {
    return this.http.post<any>(`${environment.apiUrl}/homepages/updateHomeGrid/${socialMediaId}`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  createHomeGrid(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/homepages/createHomeGrid`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }

  delteHomeGrid(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/homepages/deleteHomeGrid/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadSocialIcon(file: any) {
    var formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${environment.apiUrl}/media?process=HOME_ASSETS`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }
}
