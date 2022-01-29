import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { PmService } from '../pm.service';
declare var $:any

@Component({
  selector: 'app-manage-size',
  templateUrl: './manage-size.component.html',
  styleUrls: ['./manage-size.component.scss']
})
export class ManageSizeComponent implements OnInit {

  allSizesList:any = []
  updateSizeForm:FormGroup
  sizeDetails: any
  sizeId: any
  firstLoad = true
  
  constructor(private pmSrvc: PmService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllSizes()
    this.updateSizeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  setSizeForm() {
    this.updateSizeForm.patchValue({
      name: this.sizeDetails.name,
    })
  }

  setEditForm(typeData:any) {
    this.sizeDetails = typeData;
    this.sizeId = typeData.id;
    this.setSizeForm()
  }

  getAllSizes() {
    this.pmSrvc.getAllSizes().subscribe(res => {
      if(!res.error) {
        this.allSizesList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateSize(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateSizeForm.value))
    if(!this.sizeId) {
      this.pmSrvc.createSize(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Size Created successfully.")
          this.getAllSizes()
        }
        
      })
    } else {
      this.pmSrvc.updateSizeDetails(payLoad, this.sizeId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.sizeId = undefined
          f.resetForm();
          this.alertSrvc.success("Size updated successfully.")
          this.getAllSizes()
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
      data: {message: "Are you sure to delete the Size?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteSizeById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Size deleted successfully.")
            this.pmSrvc.getAllSizes().subscribe(res => {
              if(!res.error) {
                this.allSizesList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }

}
