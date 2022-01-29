import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user';
declare var $: any


const baseUrl = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject: BehaviorSubject<Auth>;
  public auth: Observable<Auth>;

  code: any;
  state: any;
  accessToken: any;
  userDetail: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.authSubject = new BehaviorSubject<Auth>(JSON.parse(JSON.stringify(localStorage.getItem('accessToken'))));
    this.auth = this.authSubject.asObservable();

    // Collect query params from uri
    this.activatedRoute.queryParams.subscribe(
      params => {
        let code = params['code'];
        this.code = code;

        let state = params['state'];
        this.state = state;
      });
      this.setUserDetail()
  }

  public get authValue(): Auth {
    return this.authSubject.value;
  }


  login(data: any): Observable<any> {
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     // 'Access-Control-Allow-Origin': '*',
    //     // 'Content-Type': 'application/json',
    //     'code': this.code
    //   })
    // }
    return this.http.post<any>(environment.apiUrl + "/auth/adminLogin", data)
      .pipe(map(
        response => {
          // this.accessToken = response.data.token;
          if(!response.error){
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.userDetail = response.data.user
            this.authSubject.next(response);
          }
          
          return response;
        })
      );
  }



  setUserDetail() {
    if(localStorage.getItem("user"))
    this.userDetail = JSON.parse(<string>localStorage.getItem("user"))

  }

  loggedOut() {
    localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.clear();
      this.userDetail = undefined
      $(".sidebar-pinned").removeClass("sidebar-pinned")
      this.router.navigate(["/login"]);
  }

  logout() {
    this.http.get(environment.apiUrl + "/auth/logout").subscribe(res => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.clear();
      this.userDetail = undefined
      $(".sidebar-pinned").removeClass("sidebar-pinned")
      this.router.navigate(["/login"]);
    })
    
  }

  register(data: User) {
    return this.http.post<any>(environment.apiUrl + "/auth/register", data).pipe(
      map(response => {
        return response;
      }))
  }

}
