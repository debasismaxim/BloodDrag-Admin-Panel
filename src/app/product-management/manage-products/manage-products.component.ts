import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { PmService } from '../pm.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  allProductList:any = []
  typeList: any = []
  categoryList:any = []
  
  prodImageBaseUrl = environment.baseUrl + "/uploads/products/"
  
  constructor(private pmSrvc: PmService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllProducts()
    this.getAllCategoryList()
    this.getAllTypeList()
  }

  getAllProducts() {
    this.pmSrvc.getAllProductGroup().subscribe(res => {
      if(!res.error) {
        this.allProductList = res.data
        this.initiateDataTable()
      }
      
    })
  }
  getAllCategoryList() {
    this.pmSrvc.getCategoryList().subscribe(res => {
      if(!res.error) {
        this.categoryList = res.data
      }
      
    })
  }
  getAllTypeList() {
    this.pmSrvc.getTypeList().subscribe(res => {
      if(!res.error) {
        this.typeList = res.data
      }
      
    })
  }

  initiateDataTable() {
    setTimeout(()=> {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)
    
  }

  // getStatus(key: number) {
  //   return this.statusList.filter((d: any) => d.key == key)[0]
  // }

  categoryNames(keys: any) {
    return this.categoryList.filter((d: any) => keys.includes(d.id)).map((d:any) => d.name).join(", ")
  }

  typeNames(keys: any) {
    return this.typeList.filter((d: any) => keys.includes(d.id)).map((d:any) => d.name).join(", ")
  }

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the product?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteProductgroup(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Product deleted successfully.")
            this.pmSrvc.getAllProductGroup().subscribe(res => {
              if(!res.error) {
                this.allProductList = res.data
              }
              
            })
          }
          
        })
      }
    })
  }
  
}
