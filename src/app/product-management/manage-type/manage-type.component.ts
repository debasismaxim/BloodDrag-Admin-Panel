import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { PmService } from '../pm.service';
declare var $:any

@Component({
  selector: 'app-manage-type',
  templateUrl: './manage-type.component.html',
  styleUrls: ['./manage-type.component.scss']
})
export class ManageTypeComponent implements OnInit {

  allTypesList:any = []
  updateTypeForm:FormGroup
  typeDetails: any
  typeId: any
  firstLoad = true
  
  constructor(private pmSrvc: PmService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllTypes()
    this.updateTypeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  setTypeForm() {
    this.updateTypeForm.patchValue({
      name: this.typeDetails.name,
    })
  }

  setEditForm(typeData:any) {
    this.typeDetails = typeData;
    this.typeId = typeData.id;
    this.setTypeForm()
  }

  getAllTypes() {
    this.pmSrvc.getAllTypes().subscribe(res => {
      if(!res.error) {
        this.allTypesList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateType(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateTypeForm.value))
    if(!this.typeId) {
      this.pmSrvc.createType(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Type Created successfully.")
          this.getAllTypes()
        }
        
      })
    } else {
      this.pmSrvc.updateTypeDetails(payLoad, this.typeId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.typeId = undefined
          f.resetForm();
          this.alertSrvc.success("Type updated successfully.")
          this.getAllTypes()
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
      data: {message: "Are you sure to delete the Type?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteTypeById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Type deleted successfully.")
            this.pmSrvc.getAllTypes().subscribe(res => {
              if(!res.error) {
                this.allTypesList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }
}
