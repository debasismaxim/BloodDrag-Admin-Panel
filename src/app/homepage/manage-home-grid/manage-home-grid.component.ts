import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
declare var $: any;

@Component({
  selector: 'app-manage-home-grid',
  templateUrl: './manage-home-grid.component.html',
  styleUrls: ['./manage-home-grid.component.scss']
})
export class ManageHomeGridComponent implements OnInit {

  allHomeGridList:any = []
  updateHomeGridForm:FormGroup
  homeGridDetails: any
  homeGridId: any
  firstLoad = true

  homeGridIconBaseUrl = environment.baseUrl + "/uploads/home_assets/"
  
  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllHomeGridList()
    this.updateHomeGridForm = this.fb.group({
      heading: ['', Validators.required],
      description: ['', Validators.required],
      icon: [''],
      link: [''],
    });
  }

  setHomeGridForm() {
    this.updateHomeGridForm.patchValue({
      heading: this.homeGridDetails.heading,
      description: this.homeGridDetails.description,
      icon: this.homeGridDetails.icon,
      link: this.homeGridDetails.link
    })
  }

  setEditForm(homeGridData:any) {
    this.homeGridDetails = homeGridData;
    this.homeGridId = homeGridData.id;
    this.setHomeGridForm()
  }

  getAllHomeGridList() {
    this.homeSrvc.getAllHomeGridList().subscribe(res => {
      if(!res.error) {
        this.allHomeGridList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateHomeGrid(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateHomeGridForm.value))
    if(!this.homeGridId) {
      this.homeSrvc.createHomeGrid(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Home grid created successfully.")
          this.getAllHomeGridList()
        }
        
      })
    } else {
      this.homeSrvc.updateHomeGrid(payLoad, this.homeGridId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.homeGridId = undefined
          f.resetForm();
          this.alertSrvc.success("Home grid updated successfully.")
          this.getAllHomeGridList()
        }

        
      })
    }
    
  }

  readFile(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.homeSrvc.uploadSocialIcon(input.files[0]).pipe(first()).subscribe(res => {

          if(!res.error) {
            this.updateHomeGridForm.patchValue({
              'icon': <string>res.data.filename
            })
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
      data: {message: "Are you sure to delete the Home grid?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.homeSrvc.delteHomeGrid(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Home grid deleted successfully.")
            this.homeSrvc.getAllHomeGridList().subscribe(res => {
              if(!res.error) {
                this.allHomeGridList = res.data
              }
              
            })
          }
          
        })
      }
    })
    
  }

}
