import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/app.constants';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { BadgeService } from '../badge.service';
declare var $: any;

@Component({
  selector: 'app-edit-badge',
  templateUrl: './edit-badge.component.html',
  styleUrls: ['./edit-badge.component.scss']
})
export class EditBadgeComponent implements OnInit {

  badgeDetails:any;
  badgeId: number
  badgeIcon: any;
  expiryDate = ''
  updateBadgeForm: FormGroup;
  badgeIconBaseUrl = environment.baseUrl + "/uploads/badge_icons/"
  companyIconBaseUrl = environment.baseUrl + "/uploads/sponsor_company_logo/";
  badgeTypes = AppConstants.badgeTypes;
  eventList: any[] = []
  badgeTypeList = AppConstants.badgeTypes
  constructor(private bmSrvc: BadgeService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.badgeId = this.activeRoute.snapshot.params['badgeId'];
    this.getBadgeDetails(this.badgeId)
    this.updateBadgeForm = this.fb.group({
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

  getBadgeType(key: number) {
    return this.badgeTypeList.filter((d: any) => d.key == key)[0]
  }

  getBadgeDetails(id: number) {
    this.bmSrvc.getBadgeDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.badgeDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  setEditForm() {
    this.updateBadgeForm.patchValue({
      title: this.badgeDetails.title,
      icon: this.badgeDetails.icon,
      isSponsored: this.badgeDetails.companyName ? 1: 0,
      companyName: this.badgeDetails.companyName,
      companyLogo: this.badgeDetails.companyLogo,
      extLink: this.badgeDetails.extLink,
      expiryDate:  this.badgeDetails.expiryDate,
      badgeType: this.badgeDetails.badgeType,
      yearCompletion: this.badgeDetails.yearCompletion,
      eventParticipation: this.badgeDetails.eventParticipation
    });
  }

  readBadgeFile(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        this.bmSrvc.uploadBadgeIcon(input.files[0]).pipe(first()).subscribe(res => {
          if(!res.error) {
            this.updateBadgeForm.patchValue({
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
            this.updateBadgeForm.patchValue({
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
  updateBadge(f: any) {

    this.bmSrvc.updateBadge(this.updateBadgeForm.value, this.badgeId).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        this.alertSrvc.success("Badge updated successfully.")
        this.getBadgeDetails(this.badgeId)
      }
      
    })
  }


 

  ngAfterViewInit() {
    $(".js-datepicker1").datepicker();
  
    $(".js-datepicker1").change(() => {
      this.updateBadgeForm.controls['expiryDate'].setValue($(".js-datepicker1").val())
    })
  
  }
 

}
