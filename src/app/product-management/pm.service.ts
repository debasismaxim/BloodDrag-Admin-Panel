import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PmService {

  constructor( private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/categories/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getCategoryDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/categories/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateCategoryDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/categories/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllColors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productColors/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getColorDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/productColors/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateColorDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productColors/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createColor(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productColors/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteColorById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productColors/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllSizes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productSizes/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getSizeDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/productSizes/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateSizeDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productSizes/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createSize(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productSizes/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteSizeById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productSizes/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productTypes/getAll`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getTypeDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/productTypes/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateTypeDetails(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productTypes/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createType(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/productTypes/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/productTypes/delete/${id}`).pipe(
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
    return this.http.post<any>(`${environment.apiUrl}/media/uploadMultipleImages?process=PRODUCTS`, formData).pipe(
      map(response => {
        return response;
      })
    );
  }

  createProductgroup( data:any ) {
    return this.http.post<any>(`${environment.apiUrl}/products/createProductGroup`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllProductGroup( ) {
    return this.http.get<any>(`${environment.apiUrl}/products/getAllProductGroupAdminPanel`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateProductGroup(prodId: any,  data:any ) {
    return this.http.post<any>(`${environment.apiUrl}/products/updateProductGroup/${prodId}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  getProductgroup( prodId:any ) {
    return this.http.get<any>(`${environment.apiUrl}/products/getProductGroup/${prodId}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  deleteProductgroup( prodId:any ) {
    return this.http.get<any>(`${environment.apiUrl}/products/deleteProductGroup/${prodId}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCategoryList() {
    let selectField = ['id', 'name']
    return this.http.get<any>(`${environment.apiUrl}/categories/getAll?status=1&selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getColorList() {
    let selectField = ['id', 'name']
    return this.http.get<any>(`${environment.apiUrl}/productColors/getAll?status=1&selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getTypeList() {
    let selectField = ['id', 'name']
    return this.http.get<any>(`${environment.apiUrl}/productTypes/getAll?status=1&selectField=${selectField}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createProduct( data:any ) {
    return this.http.post<any>(`${environment.apiUrl}/products/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateProduct( data:any ) {
    return this.http.post<any>(`${environment.apiUrl}/products/update/${data.id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteProduct(data:any ) {
    return this.http.get<any>(`${environment.apiUrl}/products/delete/${data.id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllChildProducts(productId:any) {
    return this.http.get<any>(`${environment.apiUrl}/products/getAll?parentId=`+ parseInt(productId)).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMyCart(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/marketPlaceCarts/myCart`,).pipe(
      map(response => {
        return response;
      })
    );
  }


  getCartDetailsById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/marketPlaceCarts/get/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  updateCart(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/marketPlaceCarts/update/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  createCart(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/marketPlaceCarts/create`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCartById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/marketPlaceCarts/delete/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }


}
