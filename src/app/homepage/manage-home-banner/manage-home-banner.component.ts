import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { PmService } from 'src/app/product-management/pm.service';
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
  productImageBaseUrl = environment.baseUrl + "/uploads/products/"
  
  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog, public pmSrvc : PmService) { }

  ngOnInit() {
    this.getHomeBanner()
    this.updateHomeGridForm = this.fb.group({
      header: [''],
      description: ['', Validators.required],
      image: [''],
      appStore: [''],
      playStore: [''],
      option : [0],
      transition : [''],
      background_link : [''],
      background_image : ['']
     });
  }

  setHomeGridForm() {
    console.log(this.homeGridDetails);
    this.updateHomeGridForm.patchValue({
      header: this.homeGridDetails.header,
      description: this.homeGridDetails.description,
      image: this.homeGridDetails.image,
      appStore: this.homeGridDetails.appStore,
      playStore: this.homeGridDetails.playStore,
      option : this.homeGridDetails.option ? this.homeGridDetails.option : 0,
      transition : this.homeGridDetails.transition,
      background_link : this.homeGridDetails.background_link,
      background_image : this.homeGridDetails.background_image && typeof this.homeGridDetails.background_image ==='object' ? this.homeGridDetails.background_image : ''
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

  uploadBackgroundFile(e:any) {
      let input = e.target
      let files = []
      if (input.files && input.files[0]) {
        for  (var i =  0; i <  e.target.files.length; i++)  {  
          files.push(e.target.files[i]);
        }
          this.pmSrvc.uploadEventImages(files).pipe(first()).subscribe(res => {
            if(!res.error) {
              let fileNames: any[] = this.updateHomeGridForm.value.background_image;
              if(this.updateHomeGridForm.value.images && this.updateHomeGridForm.value.background_image.length ) {
                fileNames = fileNames.concat(this.updateHomeGridForm.value.background_image)
              }
              res.data.forEach((file: any) => {
                fileNames.push(file.filename)
              });
              this.updateHomeGridForm.patchValue({
                'background_image': fileNames
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
  removeImage(imageIndex:number) {
    this.updateHomeGridForm.value.background_image.splice(imageIndex, 1)
  }
}
