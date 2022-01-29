import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { CsService } from '../cs.service';
declare var $:any

@Component({
  selector: 'app-manage-make',
  templateUrl: './manage-make.component.html',
  styleUrls: ['./manage-make.component.scss']
})
export class ManageMakeComponent implements OnInit {

  allMakeList:any = []
  updateMakeForm:FormGroup
  makeDetails: any
  makeId: any
  firstLoad = true
  
  constructor(private csSrvc: CsService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllMake()
    this.updateMakeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  setMakeForm() {
    this.updateMakeForm.patchValue({
      name: this.makeDetails.name,
    })
  }

  setEditForm(makeData:any) {
    this.makeDetails = makeData;
    this.makeId = makeData.id;
    this.setMakeForm()
  }

  getAllMake() {
    this.csSrvc.getAllMake().subscribe(res => {
      if(!res.error) {
        this.allMakeList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateType(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateMakeForm.value))
    if(!this.makeId) {
      this.csSrvc.createMake(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Make Created successfully.")
          this.getAllMake()
        }
        
      })
    } else {
      this.csSrvc.updateMakeDetails(payLoad, this.makeId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.makeId = undefined
          f.resetForm();
          this.alertSrvc.success("Make updated successfully.")
          this.getAllMake()
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
      data: {message: "Are you sure to delete the Make?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.csSrvc.deleteMakeById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Make deleted successfully.")
            this.csSrvc.getAllMake().subscribe(res => {
              if(!res.error) {
                this.allMakeList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }
}
