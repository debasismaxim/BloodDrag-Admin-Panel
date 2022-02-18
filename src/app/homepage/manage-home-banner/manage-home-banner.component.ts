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
  selector: 'app-manage-home-banner',
  templateUrl: './manage-home-banner.component.html',
  styleUrls: ['./manage-home-banner.component.scss']
})
export class ManageHomeBannerComponent implements OnInit {

  allHomeGridList:any = []
  updateHomeGridForm:FormGroup
  homeGridDetails: any
  homeGridId: any
  firstLoad = true

  homeGridIconBaseUrl = environment.baseUrl + "/uploads/home_assets/"
  
  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getHomeBanner()
    this.updateHomeGridForm = this.fb.group({
      header: ['', Validators.required],
      description: ['', Validators.required],
      image: ['',Validators.required],
      appStore: [''],
      playStore: ['']
    });
  }

  setHomeGridForm() {
    console.log(this.homeGridDetails);
    this.updateHomeGridForm.patchValue({
      header: this.homeGridDetails.header,
      description: this.homeGridDetails.description,
      image: this.homeGridDetails.image,
      appStore: this.homeGridDetails.appStore,
      playStore: this.homeGridDetails.playStore
    })
  }

  setEditForm(homeGridData:any) {
    this.homeGridDetails = homeGridData;
    this.homeGridId = homeGridData.id;
    this.setHomeGridForm()
  }

  getHomeBanner() {
    this.homeSrvc.getHomeBanner().subscribe(res => {
      if(!res.error) {
        this.allHomeGridList = res.data
        this.setEditForm(this.allHomeGridList);
      }
      
    })
  }

  updateHomeBanner(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateHomeGridForm.value))
    console.log(payLoad);
      this.homeSrvc.saveHomeBanner({record : payLoad}).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Saved successfully.")
          this.getHomeBanner()
        }
        
      })
  }

  readFile(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.homeSrvc.uploadSocialIcon(input.files[0]).pipe(first()).subscribe(res => {

          if(!res.error) {
            this.updateHomeGridForm.patchValue({
              'image': <string>res.data.filename
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
