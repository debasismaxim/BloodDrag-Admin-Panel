import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { HomeService } from 'src/app/homepage/home.service';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-manage-stripe',
  templateUrl: './manage-stripe.component.html',
  styleUrls: ['./manage-stripe.component.scss']
})
export class ManageStripeComponent implements OnInit {

  allHomeGridList:any = []
  updateHomeGridForm:FormGroup
  homeGridDetails: any
  homeGridId: any
  firstLoad = true
keys:any;
  homeGridIconBaseUrl = environment.baseUrl + "/uploads/home_assets/"
  
  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getHomeBanner()
    this.updateHomeGridForm = this.fb.group({
      secret: ['',Validators.required],
      public: ['',Validators.required],
      env : ['sandbox']
     });
  }

  setHomeGridForm() {
    console.log(this.homeGridDetails);
    this.keys = {};
    this.keys['sandbox'] = this.homeGridDetails['sandbox'];
    this.keys['live'] = this.homeGridDetails['live'];
    this.updateHomeGridForm.patchValue({
      secret: this.homeGridDetails.keys ? this.homeGridDetails[this.homeGridDetails.env] && this.homeGridDetails[this.homeGridDetails.env]['secret'] : '',
      public: this.homeGridDetails.keys ? this.homeGridDetails[this.homeGridDetails.env] && this.homeGridDetails[this.homeGridDetails.env]['public'] : '',

      env : this.homeGridDetails.env ? this.homeGridDetails.env : 'sandbox'
    })
  }
  changeData(){
    const envValue = this.updateHomeGridForm.get('env')?.value;
    const keysData = {
      secret:  this.updateHomeGridForm.get('secret')?.value,
      public:  this.updateHomeGridForm.get('public')?.value
    }
    this.updateHomeGridForm.patchValue(keysData)
    this.keys[envValue] =keysData
  }

  radioChange(event:any){
    const envValue = event.value;
    const keysData = {
      secret:  this.keys[envValue] ? this.keys[envValue]['secret']:'',
      public:  this.keys[envValue] ? this.keys[envValue]['public'] : ''
    }
    this.updateHomeGridForm.patchValue(keysData)
    this.keys[envValue] =keysData
  }

  setEditForm(homeGridData:any) {
    this.homeGridDetails = homeGridData;
    this.homeGridId = homeGridData.id;
    this.setHomeGridForm()
  }

  getHomeBanner() {
    this.homeSrvc.getStripe().subscribe(res => {
      if(!res.error) {
        this.allHomeGridList = res.data
        this.setEditForm(this.allHomeGridList);
      }
      
    })
  }

  updateHomeBanner(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateHomeGridForm.value))
    console.log(payLoad);
    payLoad['sandbox'] = this.keys['sandbox']
    payLoad['live'] = this.keys['live']
    console.log(payLoad);
      this.homeSrvc.saveStripe({record : payLoad}).subscribe(res => {
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
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.homeSrvc.uploadSocialIcon(input.files[0]).pipe(first()).subscribe(res => {

          if(!res.error) {
            this.updateHomeGridForm.patchValue({
              'background_image': <string>res.data.filename
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
