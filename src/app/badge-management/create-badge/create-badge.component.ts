import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/app.constants';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { BadgeService } from '../badge.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.scss']
})
export class CreateBadgeComponent implements OnInit {

  badgeIcon: any;
  expiryDate = ''
  createBadgeForm: FormGroup;
  badgeIconBaseUrl = environment.baseUrl + "/uploads/badge_icons/"
  companyIconBaseUrl = environment.baseUrl + "/uploads/sponsor_company_logo/";
  badgeTypes = AppConstants.badgeTypes;
  eventList: any[] = []
  constructor(private bmSrvc: BadgeService, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.createBadgeForm = this.fb.group({
      title: ['', Validators.required],
      icon: ['', Validators.required],
      isSponsored: ['', Validators.required],
      companyName: [''],
      companyLogo: [''],
      extLink: [''],
      expiryDate:  ['', Validators.required],
      badgeType:[''],
      yearCompletion: [''],
      eventParticipation: ['']
    });
    this.getAllEvents()
  }


  readBadgeFile(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.bmSrvc.uploadBadgeIcon(input.files[0]).pipe(first()).subscribe(res => {
          if(!res.error) {
            this.createBadgeForm.patchValue({
              'icon': <string>res.data.filename
            })
          }
        })
    }
  }

  readCompanyLogo(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.bmSrvc.uploadCompanyLogo(input.files[0]).pipe(first()).subscribe(res => {
          if(!res.error) {
            this.createBadgeForm.patchValue({
              'companyLogo': <string>res.data.filename
            })
          }
        })
    }
  }
  getAllEvents() {
    this.bmSrvc.getEventList().subscribe(res => {
      if(!res.error)
        this.eventList = res.data
    })
  }
  createBadge(f: any) {

    this.bmSrvc.createBadge(this.createBadgeForm.value).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        this.alertSrvc.success("Badge created successfully.")
      }
      
    })
  }


 

  ngAfterViewInit() {
    $(".js-datepicker1").datepicker();
  
    $(".js-datepicker1").change(() => {
      this.createBadgeForm.controls['expiryDate'].setValue($(".js-datepicker1").val())
    })
  
  }
 

}
