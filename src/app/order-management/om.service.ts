import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmService {

  constructor(private http:HttpClient) { }

  getAllOrderList() {
    return this.http.get<any>(`${environment.apiUrl}/marketPlaceCarts/getAllOrders`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOrderDetails(orderId: any) {
    return this.http.post<any>(`${environment.apiUrl}/marketPlaceCarts/getOrderDetails`, {orderId: parseInt(orderId)}).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateOrderDetails(payLoad: any) {
    return this.http.post<any>(`${environment.apiUrl}/marketPlaceCarts/updateOrder/${payLoad.id}`, payLoad).pipe(
      map(response => {
        return response;
      })
    );
  }
}
