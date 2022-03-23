import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
declare var $:any

@Component({
  selector: 'app-manage-home-slider',
  templateUrl: './manage-home-slider.component.html',
  styleUrls: ['./manage-home-slider.component.scss']
})
export class ManageHomeSliderComponent implements OnInit {

  allSocialMediaList:any = []
  updateSocialMediaForm:FormGroup
  socialMediaDetails: any
  socialMediaId: any
  firstLoad = true

  socialIconBaseUrl = environment.baseUrl + "/uploads/home_assets/"
  
  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService, 
    private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllSocialMediaList()
    this.updateSocialMediaForm = this.fb.group({
      header: ['', Validators.required],
      description: ['', Validators.required],
      moreText: ['', Validators.required],
      moreLink: ['', Validators.required],
      media: ['',Validators.required]
    });
  }

  setSocialMediaForm() {
    this.updateSocialMediaForm.patchValue({
      header: this.socialMediaDetails.header,
      description: this.socialMediaDetails.description,
      moreText: this.socialMediaDetails.moreText,
      moreLink: this.socialMediaDetails.moreLink,
      media: this.socialMediaDetails.media,

    })
  }

  setEditForm(socialMediaData:any) {
    this.socialMediaDetails = socialMediaData;
    this.socialMediaId = socialMediaData.id;
    this.setSocialMediaForm()
  }

  getAllSocialMediaList() {
    this.homeSrvc.getAllHomeSlideList().subscribe(res => {
      if(!res.error) {
        this.allSocialMediaList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateSocialMedia(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateSocialMediaForm.value))
    if(!this.socialMediaId) {
      this.homeSrvc.createSlideContent(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Home Slide Content Created Successfully.")
          this.getAllSocialMediaList()
        }
        
      })
    } else {
      this.homeSrvc.updateSlideContent(payLoad, this.socialMediaId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.socialMediaId = undefined
          f.resetForm();
          this.alertSrvc.success("Home Slide Content Updated Successfully.")
          this.getAllSocialMediaList()
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
            this.updateSocialMediaForm.patchValue({
              'media': <string>res.data.filename
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
      data: {message: "Are you sure to delete the Slide?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.homeSrvc.deleteSlideContent(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Deleted successfully.")
            this.getAllSocialMediaList();
          }
          
        })
      }
    })
    
  }

}
