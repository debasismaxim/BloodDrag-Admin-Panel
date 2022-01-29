import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { PmService } from '../pm.service';
declare var $:any

@Component({
  selector: 'app-manage-color',
  templateUrl: './manage-color.component.html',
  styleUrls: ['./manage-color.component.scss']
})
export class ManageColorComponent implements OnInit {

  allColorsList:any = []
  updateColorForm:FormGroup
  colorDetails: any
  colorId: any
  firstLoad = true
  
  constructor(private pmSrvc: PmService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllColors()
    this.updateColorForm = this.fb.group({
      name: ['', Validators.required],
      colorCode: ['', Validators.required],
    });
  }

  setColorForm() {
    this.updateColorForm.patchValue({
      name: this.colorDetails.name,
      colorCode: this.colorDetails.colorCode,
    })
  }

  setEditForm(colorData:any) {
    this.colorDetails = colorData;
    this.colorId = colorData.id;
    this.setColorForm()
  }

  getAllColors() {
    this.pmSrvc.getAllColors().subscribe(res => {
      if(!res.error) {
        this.allColorsList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateColor(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateColorForm.value))
    if(!this.colorId) {
      this.pmSrvc.createColor(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Color Created successfully.")
          this.getAllColors()
        }
        
      })
    } else {
      this.pmSrvc.updateColorDetails(payLoad, this.colorId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.colorId = undefined
          f.resetForm();
          this.alertSrvc.success("Color updated successfully.")
          this.getAllColors()
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
      data: {message: "Are you sure to delete the color?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteColorById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Color deleted successfully.")
            this.pmSrvc.getAllColors().subscribe(res => {
              if(!res.error) {
                this.allColorsList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }

}
