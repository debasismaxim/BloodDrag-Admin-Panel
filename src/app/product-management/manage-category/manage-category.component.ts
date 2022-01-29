import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { PmService } from '../pm.service';
declare var $:any;

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  allCategoriesList:any = []
  updateCategoryForm:FormGroup
  categoryDetails: any
  categoryId: any
  firstLoad = true
  
  constructor(private pmSrvc: PmService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllCategories()
    this.updateCategoryForm = this.fb.group({
      name: ['', Validators.required],
      icon: [''],
      showInMenu: ['', Validators.required],
      status: ['', Validators.required],
      displayOrder: ['', Validators.required]
    });
  }

  setCategoryForm() {
    this.updateCategoryForm.patchValue({
      name: this.categoryDetails.name,
      showInMenu: this.categoryDetails.showInMenu,
      status: this.categoryDetails.status,
      displayOrder: this.categoryDetails.displayOrder
    })
  }

  setEditForm(categoryData:any) {
    this.categoryDetails = categoryData;
    this.categoryId = categoryData.id;
    this.setCategoryForm()
  }

  getAllCategories() {
    this.pmSrvc.getAllCategories().subscribe(res => {
      if(!res.error) {
        this.allCategoriesList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateCategory(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateCategoryForm.value))
    if(!this.categoryId) {
      this.pmSrvc.createCategory(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Color Created successfully.")
          this.getAllCategories()
        }
        
      })
    } else {
      this.pmSrvc.updateCategoryDetails(payLoad, this.categoryId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.categoryId = undefined
          f.resetForm();
          this.alertSrvc.success("Category updated successfully.")
          this.getAllCategories()
        }
        
      })
    }
    
  }

  initiateDataTable() {
    setTimeout(()=> {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)
    
  }

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the category?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteCategoryById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Category deleted successfully.")
            this.pmSrvc.getAllCategories().subscribe(res => {
              if(!res.error) {
                this.allCategoriesList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }

}
