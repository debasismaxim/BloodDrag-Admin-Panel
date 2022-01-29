import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { CsService } from '../cs.service';
declare var $:any

@Component({
  selector: 'app-manage-model',
  templateUrl: './manage-model.component.html',
  styleUrls: ['./manage-model.component.scss']
})
export class ManageModelComponent implements OnInit {

  allModelsList:any = []
  updateModelForm:FormGroup
  modelDetails: any
  modelId: any
  
  makeList:any = []
  firstLoad = true;
  expiryDate = ''
  
  constructor(private csSrvc: CsService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllModels()
    this.getAllMake()
    this.updateModelForm = this.fb.group({
      makeId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  setModelForm() {
    this.updateModelForm.patchValue({
      makeId: this.modelDetails.makeId,
      name: this.modelDetails.name,
    })
  }

  setEditForm(modelData:any) {
    this.modelDetails = modelData;
    this.modelId = modelData.id;
    this.setModelForm()
  }

  getAllMake() {
    this.csSrvc.getAllMake().subscribe(res => {
      if(!res.error) {
        this.makeList = res.data
      }
    })
  }

  getAllModels() {
    this.csSrvc.getAllModels().subscribe(res => {
      if(!res.error) {
        this.allModelsList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateModel(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateModelForm.value))
    if(!this.modelId) {
      this.csSrvc.createModel(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Model Created successfully.")
          this.getAllModels()
        }
        
      })
    } else {
      this.csSrvc.updateModelDetails(payLoad, this.modelId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.modelId = undefined
          f.resetForm();
          this.alertSrvc.success("Model updated successfully.")
          this.getAllModels()
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
      data: {message: "Are you sure to delete the Model?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.csSrvc.deleteModelById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Model deleted successfully.")
            this.csSrvc.getAllModels().subscribe(res => {
              if(!res.error) {
                this.allModelsList = res.data
              }
              
            })
          }
          
        })
      }
    })
  }

  getMakeNameById(makeId:number) {
    if(makeId && this.makeList)
    return this.makeList.filter((d:any) => d.id == makeId)[0].name
    else
    return []
  }

}
